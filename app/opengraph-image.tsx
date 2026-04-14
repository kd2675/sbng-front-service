import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "./siteConfig";

export const alt = "수북농업 김종수 대표 사진";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getPortraitDataUrl() {
  const portraitPath = path.join(
    process.cwd(),
    "public",
    "image",
    "kim-jong-su-portrait.jpg",
  );
  const portraitBuffer = await readFile(portraitPath);
  return `data:image/jpeg;base64,${portraitBuffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const portraitDataUrl = await getPortraitDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0f1b0e 0%, #112614 52%, #1f4522 100%)",
          color: "white",
          padding: "42px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 20%, rgba(87,219,49,0.26), transparent 28%), radial-gradient(circle at 82% 78%, rgba(255,232,154,0.16), transparent 26%)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            position: "relative",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 32,
              fontWeight: 700,
              color: "#c9f9bb",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: siteConfig.accentColor,
              }}
            />
            전남 담양 수북농업
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 800,
                lineHeight: 1.02,
              }}
            >
              김종수 대표
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "520px",
                fontSize: 34,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.3,
              }}
            >
              수북농업의 회사 정보, 공개 연혁, 제품 안내를 함께 전합니다.
            </div>
          </div>

          <div style={{ display: "flex", gap: "28px", alignItems: "stretch", flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "18px",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  flexWrap: "wrap",
                  fontSize: 26,
                  color: "rgba(255,255,255,0.86)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 9999,
                    padding: "12px 22px",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  대표 소개
                </div>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 9999,
                    padding: "12px 22px",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  공개 연혁
                </div>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 9999,
                    padding: "12px 22px",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  제품 안내
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "360px",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={portraitDataUrl}
                alt="김종수 대표 사진"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "rgba(255,255,255,0.64)",
            }}
          >
            {siteConfig.siteName}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
