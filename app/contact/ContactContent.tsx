import { companyInfo, companyMapUrl, companyNaverMapUrl } from "../companyInfo";
import PageHero from "../components/PageHero";
import PageLinks from "../components/PageLinks";

export default function ContactContent() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="business-page contact-page"
    >
      <PageHero
        label="문의하기"
        title="상담과 방문 안내"
        description="제품 상담과 방문 일정을 대표전화로 안내해 드립니다."
        aside={
          <section
            className="contact-call-card"
            aria-labelledby="contact-call-title"
          >
            <h2 id="contact-call-title">대표전화</h2>
            <a
              href={companyInfo.telephoneHref}
              className="contact-call-number"
              aria-label={"전화 상담 " + companyInfo.telephoneDisplay}
            >
              {companyInfo.telephoneDisplay}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m7.5 3 2 4.5-2.3 2.3a15 15 0 0 0 7 7l2.3-2.3 4.5 2V20a1 1 0 0 1-1.1 1A18.9 18.9 0 0 1 3 4.1 1 1 0 0 1 4 3Z" />
              </svg>
            </a>
            <dl className="contact-call-hours">
              <div>
                <dt>상담 시간</dt>
                <dd>{companyInfo.businessHours}</dd>
              </div>
            </dl>
            <p>
              제품 상담 시 제품명과 작물, 재배 면적을 함께 알려주시면 도움이
              됩니다.
            </p>
          </section>
        }
      >
        <a href="#contact-location" className="text-link mt-6">
          회사 위치 확인 <span aria-hidden="true">↓</span>
        </a>
      </PageHero>

      <section
        id="contact-location"
        className="section-space"
        aria-labelledby="contact-location-title"
      >
        <div className="site-container">
          <div className="contact-location-grid">
            <div>
              <p className="eyebrow">오시는 길</p>
              <h2 id="contact-location-title" className="section-title">
                수북농업 담양 사업장
              </h2>
              <address className="contact-address">
                {companyInfo.address}
              </address>
              <p className="section-description">
                방문 전 대표전화로 연락해 방문 일정과 필요한 제품을 확인해
                주세요.
              </p>
              <div className="location-map-links">
                <a
                  href={companyMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  카카오맵에서 위치 보기 <span aria-hidden="true">↗</span>
                  <span className="sr-only">새 창</span>
                </a>
                <a
                  href={companyNaverMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  네이버지도에서 위치 보기 <span aria-hidden="true">↗</span>
                  <span className="sr-only">새 창</span>
                </a>
              </div>
            </div>
            <section
              className="location-panel"
              aria-labelledby="contact-company-title"
            >
              <h3 id="contact-company-title">회사 정보</h3>
              <dl className="business-facts">
                <div>
                  <dt>회사명</dt>
                  <dd>{companyInfo.legalName}</dd>
                </div>
                <div>
                  <dt>대표이사</dt>
                  <dd>{companyInfo.ceoName}</dd>
                </div>
                <div>
                  <dt>사업자등록번호</dt>
                  <dd>{companyInfo.businessRegistrationNumber}</dd>
                </div>
                <div>
                  <dt>대표전화</dt>
                  <dd>
                    <a href={companyInfo.telephoneHref}>
                      {companyInfo.telephoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </div>
          <PageLinks
            items={[
              {
                href: "/products",
                title: "제품 안내",
                description: "흙손·흙보약·무등산의 제품 자료를 확인해 보세요.",
              },
              {
                href: "/about",
                title: "회사 소개",
                description: "수북농업의 회사 개요와 생산 현장을 안내합니다.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
