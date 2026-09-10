import Link from "next/link";

import { companyInfo, companyMapUrl, companyNaverMapUrl } from "../companyInfo";
import { companyPhotoCards, industryActivityCards } from "../companyPhotos";
import { publicSources } from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import PageLinks from "../components/PageLinks";
import PageSectionNav from "../components/PageSectionNav";
import SourceLink from "../components/SourceLink";

const facts = [
  ["법인명", companyInfo.legalName],
  ["설립일", companyInfo.establishmentDate],
  ["대표이사", companyInfo.ceoName],
  ["주요 사업", "유기질비료 · 퇴비 제조"],
  ["주요 제품", "흙손 · 흙보약 · 무등산"],
  ["사업자등록번호", companyInfo.businessRegistrationNumber],
] as const;

export default function AboutContent() {
  return (
    <main id="main-content" tabIndex={-1} className="business-page">
      <PageHero
        label="회사 소개"
        title={
          <>
            담양에서 시작해
            <br />
            농업의 기반을 만듭니다
          </>
        }
        description="1996년에 설립한 수북농업은 전남 담양을 기반으로 유기질비료와 퇴비를 생산하는 농업회사법인입니다."
      >
        <div className="hero-summary">
          <span>1996년 설립</span>
          <span>전남 담양</span>
          <span>유기질비료 · 퇴비</span>
        </div>
      </PageHero>
      <PageSectionNav
        items={[
          { href: "#company-overview", label: "회사 개요" },
          { href: "#company-facility", label: "생산 현장" },
          { href: "#company-location", label: "사업장 안내" },
          { href: "#company-sources", label: "회사 자료" },
        ]}
      />

      <section id="company-overview" className="section-space">
        <div className="site-container business-split">
          <div>
            <p className="eyebrow">수북농업은</p>
            <h2 className="section-title">
              좋은 흙과 건강한 생육을
              <br />
              함께 생각합니다
            </h2>
            <div className="body-copy">
              <p>
                수북농업은 농업 현장에서 사용하는 유기질비료와 퇴비를 만듭니다.
                흙손, 흙보약, 무등산을 중심으로 분상·입상 제품을 안내하고
                있습니다.
              </p>
              <p>
                제품의 형태와 성분을 살펴보고, 작물과 토양 조건에 맞는 사용
                정보를 확인할 수 있도록 포장과 안내 자료를 함께 제공합니다.
              </p>
            </div>
            <Link href="/products" className="text-link mt-6">
              수북농업 제품 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <dl className="business-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="company-facility" className="section-space surface-paper">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">생산 현장</p>
              <h2 className="section-title">수북농업의 현장을 만나다</h2>
            </div>
            <p className="section-caption">
              농기자재신문의 2015년 현장 탐방 사진입니다.
            </p>
          </div>
          <div className="facility-grid">
            {companyPhotoCards.map((photo, index) => (
              <figure
                key={photo.src}
                className={
                  index === 0
                    ? "facility-card facility-featured"
                    : "facility-card"
                }
              >
                <div className="facility-image">
                  <LightboxImage
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 48vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <figcaption>
                  <h3>{photo.title}</h3>
                  <p>{photo.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="source-note">
            <SourceLink
              href={companyPhotoCards[0].sourceUrl}
              className="text-link"
            >
              현장 탐방 기사 · 2015.12.31 <span aria-hidden="true">↗</span>
            </SourceLink>
            <p>사진은 기사 게재 당시의 모습입니다.</p>
          </div>
        </div>
      </section>

      <section id="company-location" className="section-space">
        <div className="site-container business-split">
          <div>
            <p className="eyebrow">사업장 안내</p>
            <h2 className="section-title">담양에서 만나보세요</h2>
            <p className="section-description">
              방문이나 제품 상담이 필요하시면 대표번호로 연락해 주세요. 방문
              일정과 필요한 제품을 먼저 확인하실 수 있습니다.
            </p>
            <a
              href={companyInfo.telephoneHref}
              className="btn btn-primary mt-7"
            >
              전화 {companyInfo.telephoneDisplay}
            </a>
          </div>
          <div className="location-panel">
            <p className="location-label">수북농업 · 담양 사업장</p>
            <h3>{companyInfo.address}</h3>
            <dl className="business-facts">
              <div>
                <dt>대표 전화</dt>
                <dd>
                  <a href={companyInfo.telephoneHref}>
                    {companyInfo.telephoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>상담 시간</dt>
                <dd>{companyInfo.businessHours}</dd>
              </div>
            </dl>
            <div className="location-map-links">
              <a
                href={companyMapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                카카오맵에서 주소 보기 <span aria-hidden="true">↗</span>
                <span className="sr-only">새 창</span>
              </a>
              <a
                href={companyNaverMapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                네이버지도에서 주소 보기 <span aria-hidden="true">↗</span>
                <span className="sr-only">새 창</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="company-sources" className="section-space surface-paper">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">회사 자료</p>
              <h2 className="section-title">소개서와 관련 기록</h2>
            </div>
            <p className="section-caption">
              회사와 제품에 관한 자료를 살펴보세요.
            </p>
          </div>
          <a
            href="/company-brochure.hwp"
            download
            className="brochure-download"
          >
            <div>
              <span className="resource-type">HWP 파일</span>
              <h3>수북농업 회사 소개서</h3>
              <p>회사와 주요 제품을 소개합니다.</p>
            </div>
            <span className="btn btn-primary">
              다운로드 <span aria-hidden="true">↓</span>
            </span>
          </a>
          <details className="source-disclosure">
            <summary>
              관련 기사와 공개 자료 <span>{publicSources.length - 1}개</span>
            </summary>
            <ul className="source-directory">
              {publicSources
                .filter(
                  (source) => source.url && source.label !== "회사 소개서",
                )
                .map((source) => (
                  <li key={source.label}>
                    <h3>{source.label}</h3>
                    <p>{source.detail}</p>
                    <SourceLink
                      href={source.url!}
                      className="text-link"
                      showArchive
                    >
                      자료 보기 <span aria-hidden="true">↗</span>
                    </SourceLink>
                  </li>
                ))}
            </ul>
            <p className="source-note">
              각 자료의 날짜와 출처를 기준으로 정리했습니다. 과거 직책·사진·제품
              자료는 해당 시점의 기록입니다.
            </p>
          </details>
          <details className="source-disclosure">
            <summary>
              업계 교류 사진 <span>2015년 기록</span>
            </summary>
            <div className="activity-gallery">
              {industryActivityCards.map((photo) => (
                <figure key={photo.src}>
                  <div className="relative aspect-[4/3]">
                    <LightboxImage
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 42vw, 90vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption>
                    <h3>{photo.title}</h3>
                    <p>{photo.description}</p>
                    <SourceLink href={photo.sourceUrl} className="text-link">
                      {photo.sourceLabel} <span aria-hidden="true">↗</span>
                    </SourceLink>
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
          <PageLinks
            items={[
              {
                href: "/products",
                title: "제품 안내",
                description: "흙손·흙보약·무등산의 차이를 비교해 보세요.",
              },
              {
                href: "/history",
                title: "수북농업 연혁",
                description: "설립부터 이어온 회사와 대표의 활동을 만나보세요.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
