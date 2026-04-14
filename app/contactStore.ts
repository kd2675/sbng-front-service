import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type ContactSubmissionInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type ContactSubmission = ContactSubmissionInput & {
  id: string;
  createdAt: string;
};

const dataDirPath = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDirPath, "contact-submissions.json");

async function ensureStore(): Promise<void> {
  await mkdir(dataDirPath, { recursive: true });

  try {
    await readFile(dataFilePath, "utf8");
  } catch {
    await writeFile(dataFilePath, "[]\n", "utf8");
  }
}

function sanitizeField(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function sanitizeMessage(value: string): string {
  return value.trim().replace(/\r\n/g, "\n");
}

function validateInput(input: ContactSubmissionInput): ContactSubmissionInput {
  const name = sanitizeField(input.name);
  const phone = sanitizeField(input.phone);
  const email = sanitizeField(input.email);
  const message = sanitizeMessage(input.message);

  if (name.length < 2 || name.length > 80) {
    throw new Error("이름 또는 농가명을 2자 이상 80자 이하로 입력해 주세요.");
  }

  if (phone.length < 7 || phone.length > 30) {
    throw new Error("연락처를 올바르게 입력해 주세요.");
  }

  if (email.length < 5 || email.length > 120 || !email.includes("@")) {
    throw new Error("이메일을 올바르게 입력해 주세요.");
  }

  if (message.length < 10 || message.length > 3000) {
    throw new Error("문의 내용은 10자 이상 3000자 이하로 입력해 주세요.");
  }

  return { name, phone, email, message };
}

async function readSubmissions(): Promise<ContactSubmission[]> {
  await ensureStore();

  try {
    const raw = await readFile(dataFilePath, "utf8");
    const parsed = JSON.parse(raw) as ContactSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const submissions = await readSubmissions();

  return submissions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveContactSubmission(
  input: ContactSubmissionInput,
): Promise<ContactSubmission> {
  const sanitized = validateInput(input);
  const submissions = await readSubmissions();
  const nextSubmission: ContactSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...sanitized,
  };

  submissions.push(nextSubmission);
  await writeFile(dataFilePath, `${JSON.stringify(submissions, null, 2)}\n`, "utf8");

  return nextSubmission;
}
