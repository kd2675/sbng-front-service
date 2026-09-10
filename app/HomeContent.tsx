import Link from "next/link";

import { companyInfo } from "./companyInfo";
import HomeSectionNav from "./components/HomeSectionNav";
import LightboxImage from "./components/LightboxImage";
import SourceLink from "./components/SourceLink";
import { productCatalog } from "./productCatalog";

const milestones = [
  {
    year: "1996",
    title: "수북농업 설립",
    detail: "담양에서 시작한 비료 제조업",
    href: "/history#history-1996-03-30",
  },
  {
    year: "2014",
    title: "산업과 함께 성장",
    detail: "김종수 대표, 조합 제3대 이사장 취임",
    href: "/history#history-2014-07-09",
  },
  {
    year: "2023",
    title: "지역과 나누는 마음",
    detail: "담양군 장학금 기탁 참여",
    href: "/history#history-2023-01-19",
  },
] as const;

export default function HomeContent() {
  return (
    <main id="main-content" tabIndex={-1} className="legacy-page home-page">
      <HomeSectionNav />
      <section
        tabIndex={-1}
        id="home-main"
        className="home-section home-hero"
        aria-labelledby="home-main-title"
      >
        <div className="hero-decoration" aria-hidden="true">
          <div className="hero-orbit hero-orbit-outer" />
          <div className="hero-orbit hero-orbit-inner" />
          <div className="hero-field-lines" />
        </div>
        <div className="home-content">
          <p className="home-eyebrow">담양의 유기질비료 · 퇴비 제조기업</p>
          <h1 id="home-main-title" className="home-headline font-display">
            흙을 생각하는
            <br />
            담양의 <span>수북농업</span>
          </h1>
          <p className="home-lead">
            1996년부터 이어온 담양의 농업 현장.
            <br className="hidden sm:block" />
            흙손·흙보약·무등산으로 토양과 작물의 기반을 함께 생각합니다.
          </p>
          <div className="home-actions">
            <Link href="/products" className="btn btn-light">
              제품 살펴보기 <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/about" className="btn home-outline-button">
              회사 소개
            </Link>
          </div>
          <div className="hero-facts">
            <span>
              <strong>1996</strong> 설립
            </span>
            <span>
              <strong>전남 담양</strong> 사업장
            </span>
            <span>
              <strong>흙손 · 흙보약 · 무등산</strong> 대표 제품
            </span>
          </div>
          <a href="#home-company" className="home-scroll-link">
            수북농업 알아보기 <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        tabIndex={-1}
        id="home-company"
        className="home-section home-paper"
        aria-labelledby="home-company-title"
      >
        <div className="home-content home-split">
          <div>
            <p className="eyebrow">회사 소개</p>
            <h2 id="home-company-title" className="section-title">
              담양에 뿌리를 둔<br />
              비료 제조기업
            </h2>
            <p className="section-description">
              {companyInfo.legalName}은 전남 담양에서 유기질비료와 퇴비를
              생산합니다. 분상·입상 제품을 통해 다양한 농업 현장의 토양 관리와
              밑거름 사용을 돕습니다.
            </p>
            <Link href="/about" className="text-link mt-6">
              수북농업 자세히 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <dl className="home-company-facts">
            <div>
              <dt>시작</dt>
              <dd className="founding-year">
                1996<span>년</span>
              </dd>
            </div>
            <div>
              <dt>주요 사업</dt>
              <dd>유기질비료 · 퇴비 제조</dd>
            </div>
            <div>
              <dt>사업장</dt>
              <dd>{companyInfo.address}</dd>
            </div>
            <div>
              <dt>대표</dt>
              <dd>{companyInfo.ceoName}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        tabIndex={-1}
        id="home-products"
        className="home-section bg-white"
        aria-labelledby="home-products-title"
      >
        <div className="home-content">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">제품 안내</p>
              <h2 id="home-products-title" className="section-title">
                우리 땅을 위한 세 가지 제품
              </h2>
            </div>
            <Link href="/products#product-compare" className="text-link">
              제품 비교하기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-product-grid">
            {productCatalog.map((product) => (
              <article key={product.id} className="home-product-card">
                <div className="home-product-image">
                  <LightboxImage
                    src={product.frontImage}
                    alt={product.name + " 제품 실사"}
                    hintClassName="compact-image-hint"
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 90vw"
                    className="object-contain p-3"
                  />
                </div>
                <div className="home-product-copy">
                  <p className="product-kicker">
                    {product.material} · {product.form}
                  </p>
                  <h3>{product.name}</h3>
                  <p>{product.cardSummary}</p>
                  <Link
                    href={"/products#product-" + product.id}
                    className="text-link"
                  >
                    {product.name} 자세히 보기 <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        tabIndex={-1}
        id="home-ceo"
        className="home-section home-paper"
        aria-labelledby="home-ceo-title"
      >
        <div className="home-content home-ceo-layout">
          <figure className="home-portrait">
            <div className="relative aspect-[4/5]">
              <LightboxImage
                src="/image/kim-jong-su-portrait.jpg"
                alt="농민신문 기사에 실린 김종수 대표 사진"
                fill
                sizes="(min-width: 768px) 320px, 70vw"
                className="object-contain"
              />
            </div>
            <figcaption>수북농업 대표이사 김종수</figcaption>
          </figure>
          <div>
            <p className="eyebrow">대표 소개</p>
            <h2 id="home-ceo-title" className="section-title">
              품질에 대한 생각을
              <br />
              현장에서 이어갑니다
            </h2>
            <p className="section-description">
              김종수 대표는 수북농업의 설립과 성장을 이끌며 유기질비료 산업과
              지역 농업 현장에서 활동해 왔습니다.
            </p>
            <p className="home-career">
              한국유기질비료산업협동조합 제3·4대 이사장 역임
            </p>
            <Link href="/ceo" className="text-link mt-6">
              김종수 대표 소개 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section
        tabIndex={-1}
        id="home-history"
        className="home-section home-history-surface"
        aria-labelledby="home-history-title"
      >
        <div className="home-content">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">연혁</p>
              <h2 id="home-history-title" className="section-title">
                담양에서 이어온 발자취
              </h2>
            </div>
            <Link href="/history" className="text-link">
              전체 연혁 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ol className="home-milestones">
            {milestones.map((item) => (
              <li key={item.year}>
                <p className="milestone-year">{item.year}</p>
                <span className="milestone-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <Link href={item.href} className="text-link">
                  기록 보기 <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="source-note">
            회사 정보와 관련 기사에 기록된 주요 활동입니다. 자세한 내용과 출처는
            연혁에서 확인할 수 있습니다.
          </p>
        </div>
      </section>
      <section
        tabIndex={-1}
        id="home-sources"
        className="home-section bg-white"
        aria-labelledby="home-sources-title"
      >
        <div className="home-content">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">회사 자료</p>
              <h2 id="home-sources-title" className="section-title">
                수북농업을 더 알아보세요
              </h2>
            </div>
            <Link href="/about#company-sources" className="text-link">
              자료 더 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-resource-grid">
            <a
              href="/company-brochure.hwp"
              download
              className="resource-feature"
            >
              <span className="resource-type">회사 소개서 · HWP</span>
              <h3>수북농업 회사 소개서</h3>
              <p>회사와 주요 제품을 소개하는 자료입니다.</p>
              <span className="resource-action">
                소개서 다운로드 <span aria-hidden="true">↓</span>
              </span>
            </a>
            <div className="resource-list">
              <SourceLink
                href="https://www.newsam.co.kr/news/article.html?no=8732"
                className="resource-row"
              >
                <span className="resource-type">현장 탐방 · 2015.12.31</span>
                <h3>기사로 만나는 담양의 생산 현장</h3>
                <span>
                  농기자재신문 <span aria-hidden="true">↗</span>
                </span>
              </SourceLink>
              <Link href="/ceo#ceo-stories" className="resource-row">
                <span className="resource-type">대표의 이야기</span>
                <h3>품질과 산업을 생각하는 경영 방향</h3>
                <span>
                  대표 소개에서 보기 <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        tabIndex={-1}
        id="home-contact"
        className="home-section home-contact-surface"
        aria-labelledby="home-contact-title"
      >
        <div className="home-content home-split">
          <div>
            <p className="home-eyebrow">전화 안내</p>
            <h2 id="home-contact-title" className="section-title">
              제품 선택부터 사용 안내까지
              <br />
              전화로 상담해 드립니다
            </h2>
            <p className="section-description">
              궁금한 제품과 작물, 재배 면적을 알려주시면 필요한 내용을 안내해
              드립니다.
            </p>
            <a href={companyInfo.telephoneHref} className="home-contact-number">
              {companyInfo.telephoneDisplay}
              <span aria-hidden="true">↗</span>
            </a>
            <p className="home-contact-hours">{companyInfo.businessHours}</p>
          </div>
          <div className="home-address">
            <p className="home-eyebrow">담양 사업장</p>
            <h3>{companyInfo.legalName}</h3>
            <p>{companyInfo.address}</p>
            <Link
              href="/contact#contact-location"
              className="btn home-outline-button"
            >
              사업장 안내 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
