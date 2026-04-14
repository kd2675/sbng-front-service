import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "수북농업 로고";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getLogoDataUrl() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "image",
    "logo-og.png",
  );
  const logoBuffer = await readFile(logoPath);
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const logoDataUrl = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <img
          src={logoDataUrl}
          alt="수북농업 로고"
          style={{
            width: "72%",
            height: "72%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    ),
    size,
  );
}
