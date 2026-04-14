import { NextResponse } from "next/server";
import { saveContactSubmission } from "@/app/contactStore";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      message?: string;
    };

    const saved = await saveContactSubmission({
      name: body.name ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      message: body.message ?? "",
    });

    return NextResponse.json({
      ok: true,
      submissionId: saved.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "문의 저장 중 오류가 발생했습니다.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 400 },
    );
  }
}
