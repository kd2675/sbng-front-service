import Link from "next/link";

export default function PageLinks({
  items,
}: {
  items: readonly { href: string; title: string; description: string }[];
}) {
  return (
    <nav aria-label="관련 페이지" className="related-pages">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <span aria-hidden="true">↗</span>
        </Link>
      ))}
    </nav>
  );
}
