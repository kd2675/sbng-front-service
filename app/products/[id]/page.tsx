import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import LightboxImage from "@/app/components/LightboxImage";
import SiteFooter from "@/app/components/SiteFooter";
import SiteNav from "@/app/components/SiteNav";
import { productCatalog, productCatalogById } from "@/app/productCatalog";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "@/app/siteConfig";
import { buildProductDetailPageJsonLd } from "@/app/structuredData";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return productCatalog.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productCatalogById.get(id);

  if (!product) {
    return buildPageMetadata({
      title: "제품 소개",
      description: "수북농업 제품 안내 페이지입니다.",
      path: "/products",
    });
  }

  return buildPageMetadata({
    title: `${product.name} ${product.category} ${product.packUnit}`,
    description: `${product.summary} 포장단위 ${product.packUnit}, 사용 기준 ${product.usage}.`,
    path: `/products/${product.id}`,
    keywords: [
      product.name,
      product.displayName,
      product.category,
      product.material,
      "수북농업 제품",
    ],
    imagePath: product.frontImage,
    imageAlt: `${product.name} 제품 전면 이미지`,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = productCatalogById.get(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildProductDetailPageJsonLd(product)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "제품 소개", path: "/products" },
          { name: product.name, path: `/products/${product.id}` },
        ])}
      />
      <div className="min-h-screen bg-[#f4f6ef]">
        <SiteNav />

        <main className="px-6 pb-20 pt-28 md:px-10 lg:px-20">
          <section className="mx-auto max-w-7xl rounded-[2rem] bg-[#112614] px-8 py-10 text-white shadow-[0_22px_54px_rgba(12,26,12,0.16)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary)]">
              제품 상세
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-white/84">{product.displayName}</p>
            <p className="mt-5 max-w-3xl leading-relaxed text-white/78">{product.summary}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[product.category, product.form, product.packUnit, product.material].map(
                (token, index) => (
                <span
                  key={`${product.id}-token-${index}`}
                  className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88"
                >
                  {token}
                </span>
                ),
              )}
            </div>
          </section>

          <section className="mx-auto mt-10 grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_46px_rgba(12,26,12,0.06)]">
              <h2 className="text-2xl font-bold text-[var(--agri-ink)]">핵심 정보</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "제품명", value: product.displayName },
                  { label: "성상", value: product.form },
                  { label: "자재명", value: product.material },
                  { label: "포장단위", value: product.packUnit },
                  { label: "사용 기준", value: product.usage },
                  { label: "보증 성분량", value: product.guarantee },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#f4f8f0] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6a7f69]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-[#dfe7d8] bg-[#f8fbf5] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8169]">
                  제품 특징
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#536a52]">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--agri-primary-deep)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.cropTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#eef3e8] px-4 py-2 text-sm font-semibold text-[#446143]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            <article className="grid gap-6">
              {[
                { title: "제품 전면", src: product.frontImage },
                { title: "안내 시트", src: product.sheetImage },
                { title: "제품 후면", src: product.backImage },
              ].map((image) => (
                <section
                  key={image.title}
                  className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
                >
                  <div className="relative aspect-[4/3] bg-[#eef3e8]">
                    <LightboxImage
                      alt={`${product.name} ${image.title}`}
                      src={image.src}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-6 py-5">
                    <h2 className="text-xl font-bold text-[var(--agri-ink)]">{image.title}</h2>
                  </div>
                </section>
              ))}
            </article>
          </section>

          <section className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex rounded-full bg-[var(--agri-ink)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
            >
              제품 목록으로 돌아가기
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-black/12 px-6 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
            >
              제품 상담 문의
            </Link>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
