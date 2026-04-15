type JsonLdProps = {
  data: object;
};

/**
 * JSON-LD 데이터를 `<script type="application/ld+json">` 으로 인라인 삽입합니다.
 *
 * `JSON.stringify` 는 `</script>`, `<!--`, `]]>` 등 HTML 파서를 혼란시킬 수 있는
 * 시퀀스를 이스케이프하지 않으므로, 수동으로 `\u003c` / `\u003e` / `\u0026` 로
 * 변환해 XSS·파싱 충돌을 방지합니다.
 * 이 방식은 React/Next.js 문서와 OWASP JSON XSS 가이드의 권장 패턴입니다.
 */
function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
