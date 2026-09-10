import Image from "next/image";

import { companyInfo } from "../companyInfo";
import PageHero from "../components/PageHero";
import PageSectionNav from "../components/PageSectionNav";
import ProductGallery from "../components/ProductGallery";
import { productCatalog } from "../productCatalog";

export default function ProductsContent() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="business-page products-page"
    >
      <PageHero
        label="제품 안내"
        title={
          <>
            우리 땅을 위한
            <br />
            흙손 · 흙보약 · 무등산
          </>
        }
        description="제품의 종류와 성상, 주요 성분을 비교하고 포장에 담긴 자세한 사용 정보를 확인해 보세요."
      />
      <PageSectionNav
        items={[
          { href: "#product-compare", label: "제품 비교" },
          ...productCatalog.map((product) => ({
            href: "#product-" + product.id,
            label: product.name,
          })),
        ]}
      />

      <section id="product-compare" className="section-space">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">한눈에 비교하기</p>
              <h2 className="section-title">어떤 제품을 찾으시나요?</h2>
            </div>
            <p className="section-caption">
              제품별 자료에 기재된 정보를 정리했습니다.
            </p>
          </div>
          <div className="product-compare-grid">
            {productCatalog.map((product) => (
              <article key={product.id} className="product-compare-card">
                <div className="compare-product-heading">
                  <div>
                    <p className="product-kicker">{product.material}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <Image
                    src={product.frontImage}
                    alt={product.name + " 포장"}
                    width={90}
                    height={112}
                    className="object-contain"
                  />
                </div>
                <dl className="compare-facts">
                  <div>
                    <dt>성상</dt>
                    <dd>{product.form}</dd>
                  </div>
                  <div>
                    <dt>포장</dt>
                    <dd>{product.packUnit}</dd>
                  </div>
                  <div>
                    <dt>보증 성분</dt>
                    <dd>{product.guarantee}</dd>
                  </div>
                </dl>
                <a href={"#product-" + product.id} className="text-link">
                  {product.name} 자세히 보기 <span aria-hidden="true">↓</span>
                </a>
              </article>
            ))}
          </div>
          <p className="source-note">
            실제 적용량과 시기는 작물·토양 조건에 따라 달라집니다. 포장 뒷면과
            안내 시트를 확인하고 전화로 상담해 주세요.
          </p>
        </div>
      </section>

      {productCatalog.map((product, index) => (
        <section
          key={product.id}
          id={"product-" + product.id}
          className={
            "section-space product-detail " +
            (index % 2 === 0 ? "surface-paper" : "")
          }
        >
          <div className="site-container">
            <div className="product-detail-heading">
              <span className="product-index">0{index + 1}</span>
              <div>
                <p className="eyebrow">
                  {product.material} · {product.form}
                </p>
                <h2 className="section-title">{product.name}</h2>
                <p className="section-description">{product.displayName}</p>
              </div>
            </div>
            <div className="product-detail-grid">
              <ProductGallery
                name={product.name}
                images={[
                  { src: product.frontImage, label: "제품 앞면" },
                  { src: product.backImage, label: "포장 뒷면" },
                  { src: product.sheetImage, label: "안내 시트" },
                ]}
              />
              <div className="product-detail-copy">
                <p className="product-description">{product.summary}</p>
                <dl className="business-facts">
                  <div>
                    <dt>자재명</dt>
                    <dd>{product.material}</dd>
                  </div>
                  <div>
                    <dt>성상 · 포장</dt>
                    <dd>
                      {product.form} · {product.packUnit}
                    </dd>
                  </div>
                  <div>
                    <dt>용도</dt>
                    <dd>{product.useType}</dd>
                  </div>
                  <div>
                    <dt>보증 성분량</dt>
                    <dd>{product.guarantee}</dd>
                  </div>
                  <div>
                    <dt>사용 기준</dt>
                    <dd>
                      {product.usage}
                      <small>
                        제품 자료 기재 기준 · 상세 내용은 안내 시트 참고
                      </small>
                    </dd>
                  </div>
                </dl>
                <ul className="product-points">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <a
                  href={companyInfo.telephoneHref}
                  className="btn btn-primary"
                  aria-label={
                    product.name + " 전화 상담 " + companyInfo.telephoneDisplay
                  }
                >
                  {product.name} 전화 상담 <span aria-hidden="true">↗</span>
                </a>
                <p className="source-note">
                  {companyInfo.telephoneDisplay} · {companyInfo.businessHours}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="section-space">
        <div className="site-container product-help">
          <div>
            <p className="eyebrow">제품 상담</p>
            <h2 className="section-title">사용할 작물과 면적을 알려주세요</h2>
            <p className="section-description">
              제품명, 작물, 재배 면적, 사용 시기를 함께 말씀해 주시면 상담에
              도움이 됩니다.
            </p>
          </div>
          <div>
            <a href={companyInfo.telephoneHref} className="btn btn-primary">
              전화 {companyInfo.telephoneDisplay}
            </a>
            <p className="source-note">{companyInfo.businessHours}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
