export default function Loading() {
  return (
    <main
      id="main-content"
      className="site-container section-space"
      aria-busy="true"
    >
      <p role="status" className="muted py-16 text-center">
        화면을 불러오는 중입니다…
      </p>
    </main>
  );
}
