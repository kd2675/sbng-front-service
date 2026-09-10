import { historyFlowTimeline } from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import PageLinks from "../components/PageLinks";
import PageSectionNav from "../components/PageSectionNav";
import SourceLink from "../components/SourceLink";

import HistoryTimeline from "./HistoryTimeline";

export default function HistoryContent() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="business-page history-page"
    >
      <PageHero
        label="연혁"
        title={
          <>
            담양에서 이어온
            <br />
            수북농업의 발자취
          </>
        }
        description="회사의 시작부터 산업·지역과 함께한 활동까지. 수북농업과 김종수 대표의 주요 기록을 시간순으로 만나보세요."
      >
        <div className="hero-summary">
          <span>1996년 설립</span>
          <span>사진과 함께 보는 기록</span>
          <span>출처와 자료 시점 표시</span>
        </div>
      </PageHero>
      <PageSectionNav
        items={[
          { href: "#history-1996-03-30", label: "수북농업의 시작" },
          { href: "#history-2014-07-09", label: "2010년대" },
          { href: "#history-2020-02-03", label: "2020년대" },
          { href: "#history-2023-01-19", label: "2023년 이후" },
        ]}
      />
      <section className="section-space" aria-label="수북농업 연혁 타임라인">
        <div className="site-container">
          <p className="timeline-intro">
            기사와 회사 자료에 기록된 활동입니다. 사진·캡처의 시점은 각 출처에
            표시했습니다.
          </p>
          <HistoryTimeline>
            {historyFlowTimeline.map((item) => (
              <li
                key={item.period}
                id={"history-" + item.period.replaceAll(".", "-")}
                className="history-entry"
              >
                <span className="history-marker" aria-hidden="true" />
                <div className="history-copy">
                  <p className="history-date">
                    <time dateTime={item.period.replaceAll(".", "-")}>
                      {item.period}
                    </time>
                  </p>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  {item.sourceUrl && item.sourceLabel && (
                    <SourceLink
                      href={item.sourceUrl}
                      className="text-link"
                      showArchive
                    >
                      {item.sourceLabel} <span aria-hidden="true">↗</span>
                    </SourceLink>
                  )}
                </div>
                <div className="history-photo-frame">
                  <figure className="history-photo">
                    <div className="history-photo-image relative aspect-[4/3]">
                      <LightboxImage
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 480px, (min-width: 768px) 40vw, 85vw"
                        className="object-contain p-3"
                      />
                    </div>
                    <figcaption>{item.sourceLabel || "회사 자료"}</figcaption>
                  </figure>
                </div>
              </li>
            ))}
          </HistoryTimeline>
          <PageLinks
            items={[
              {
                href: "/about",
                title: "수북농업의 오늘",
                description: "회사 개요와 담양 사업장, 생산 현장을 안내합니다.",
              },
              {
                href: "/ceo",
                title: "김종수 대표 소개",
                description: "대표의 경영 방향과 주요 활동을 살펴보세요.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
