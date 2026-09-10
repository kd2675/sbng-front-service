import Link from "next/link";

import { companyInfo } from "../companyInfo";
import { externalPhotoCredit } from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import PageLinks from "../components/PageLinks";
import PageSectionNav from "../components/PageSectionNav";
import SourceLink from "../components/SourceLink";

const principles = [
  {
    title: "품질이 만드는 신뢰",
    description:
      "원료에서 제품까지 품질을 우선하는 방향으로, 농업 현장에서 믿고 사용하는 제품을 생각합니다.",
    source: "농기자재신문 · 2015.06.18",
    url: "https://www.newsam.co.kr/news/article.html?no=8253",
  },
  {
    title: "함께 성장하는 산업",
    description:
      "조합원 간의 화합과 협력을 바탕으로 유기질비료 산업의 발전을 이야기해 왔습니다.",
    source: "농민신문 · 2014.07.14",
    url: "https://www.nongmin.com/article/20140713094869",
  },
  {
    title: "현장에 필요한 기준",
    description:
      "비료 공정규격과 품질 기준에 관한 현장의 의견을 전달하며 산업의 과제를 함께 살펴왔습니다.",
    source: "영농자재신문 · 2019.03.14",
    url: "https://www.newsfm.kr/news/article_print.html?no=3557",
  },
] as const;
const careers = [
  {
    period: "1996",
    title: "수북농업 설립",
    detail: "담양을 기반으로 비료 제조업 시작",
    url: "http://weeklypeople.co.kr/news/view.php?no=2086",
  },
  {
    period: "2012 · 2019",
    title: "농림수산식품부·환경부 장관 표창",
    detail: "주간인물 2020년 인터뷰에 소개된 수상 이력",
    url: "http://weeklypeople.co.kr/news/view.php?no=2086",
  },
  {
    period: "2014 · 2016",
    title: "한국유기질비료산업협동조합 제3·4대 이사장",
    detail: "제3대 취임 후 제4대 이사장 재선출 · 역임",
    url: "https://kofic92.or.kr/about/sub02",
  },
  {
    period: "2021",
    title: "전남도친환경농산업연합회 제2부회장 선출",
    detail: "2021년 2월 보도된 지역 농업 단체 활동",
    url: "https://www.newsam.co.kr/news/article.html?no=32817",
  },
] as const;

export default function CeoContent() {
  return (
    <main id="main-content" tabIndex={-1} className="business-page ceo-page">
      <PageHero
        label="대표 소개"
        title={
          <>
            현장에서 이어온
            <br />
            품질에 대한 생각
          </>
        }
        description="수북농업의 설립과 성장을 이끈 김종수 대표는 유기질비료 산업과 지역 농업 현장에서 활동해 왔습니다."
        aside={
          <figure className="ceo-portrait">
            <div className="relative aspect-[4/5]">
              <LightboxImage
                src="/image/kim-jong-su-portrait.jpg"
                alt="김종수 대표 인물 사진"
                fill
                priority
                sizes="(min-width: 768px) 300px, 70vw"
                className="object-contain"
              />
            </div>
            <figcaption>
              <SourceLink href={externalPhotoCredit.url}>
                사진 출처 · 농민신문 <span aria-hidden="true">↗</span>
              </SourceLink>
            </figcaption>
          </figure>
        }
      >
        <div className="ceo-signature">
          <span>{companyInfo.legalName} 대표이사</span>
          <strong>{companyInfo.ceoName}</strong>
        </div>
      </PageHero>
      <PageSectionNav
        items={[
          { href: "#ceo-principles", label: "경영 방향" },
          { href: "#ceo-career", label: "주요 경력" },
          { href: "#ceo-stories", label: "대표의 활동" },
        ]}
      />

      <section id="ceo-principles" className="section-space">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">경영 방향</p>
              <h2 className="section-title">품질과 협력, 현장의 목소리</h2>
            </div>
            <p className="section-caption">
              인터뷰와 활동 기록에서 전해진 생각입니다.
            </p>
          </div>
          <div className="principle-grid">
            {principles.map((item, index) => (
              <article key={item.title}>
                <span className="principle-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <SourceLink href={item.url} className="text-link">
                  {item.source} <span aria-hidden="true">↗</span>
                </SourceLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="ceo-career" className="section-space surface-paper">
        <div className="site-container business-split">
          <div>
            <p className="eyebrow">주요 경력</p>
            <h2 className="section-title">
              기업과 산업을
              <br />
              함께 살펴온 시간
            </h2>
            <p className="section-description">
              회사 설립, 조합 활동과 지역 농업 분야의 주요 이력입니다. 날짜별
              활동과 관련 자료는 연혁에서 자세히 볼 수 있습니다.
            </p>
            <Link href="/history" className="text-link mt-6">
              전체 연혁 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <dl className="career-list">
              {careers.map((item) => (
                <div key={item.period}>
                  <dt>{item.period}</dt>
                  <dd>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <SourceLink href={item.url} className="text-link">
                      관련 기록 <span aria-hidden="true">↗</span>
                    </SourceLink>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="source-note">
              직책은 각 기록에 기재된 시점의 이력입니다. 조합 이사장 경력은
              제3·4대 재임 이력으로 안내합니다.
            </p>
          </div>
        </div>
      </section>
      <section id="ceo-stories" className="section-space">
        <div className="site-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">대표의 활동</p>
              <h2 className="section-title">이야기와 현장으로 만나다</h2>
            </div>
          </div>
          <div className="ceo-story-grid">
            <figure className="story-photo">
              <div className="relative aspect-[4/3]">
                <LightboxImage
                  src="/image/kim-jong-su-assembly.jpg"
                  alt="비료품질관리교육 행사 사진"
                  fill
                  sizes="(min-width: 1024px) 46vw, 90vw"
                  className="object-contain"
                />
              </div>
              <figcaption>비료품질관리교육 행사 자료</figcaption>
            </figure>
            <div className="resource-list">
              <SourceLink
                href="http://weeklypeople.co.kr/news/view.php?no=2086"
                className="resource-row"
              >
                <span className="resource-type">주간인물 · 2020.02.03</span>
                <h3>수북농업의 시작과 성장 이야기</h3>
                <p>1996년 설립 이후의 활동과 경영 이력을 담은 인터뷰입니다.</p>
                <span>
                  인터뷰 읽기 <span aria-hidden="true">↗</span>
                </span>
              </SourceLink>
              <SourceLink
                href="https://www.newsfm.kr/news/article_print.html?no=4987"
                className="resource-row"
              >
                <span className="resource-type">영농자재신문 · 2020.08.07</span>
                <h3>수북농업과 수북환경개발</h3>
                <p>두 기업의 대표 이력과 조합 활동이 소개된 기사입니다.</p>
                <span>
                  기사 읽기 <span aria-hidden="true">↗</span>
                </span>
              </SourceLink>
            </div>
          </div>
          <PageLinks
            items={[
              {
                href: "/about",
                title: "수북농업 회사 소개",
                description: "담양의 사업장과 생산 현장을 살펴보세요.",
              },
              {
                href: "/history",
                title: "사진으로 보는 연혁",
                description: "회사와 대표의 발자취를 시간순으로 만나보세요.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
