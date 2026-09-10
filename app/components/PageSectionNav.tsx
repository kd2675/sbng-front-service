export default function PageSectionNav({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label="페이지 내용 바로가기" className="page-section-nav">
      <div className="site-container">
        {items.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
