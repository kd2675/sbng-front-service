import { companyInfo } from "./companyInfo";

type PublicSource = {
  label: string;
  detail: string;
  url?: string;
};

type RecordCard = {
  title: string;
  value: string;
  description: string;
};

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
};

type HistoryFlowItem = {
  period: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  sourceLabel?: string;
  sourceUrl?: string;
};

type CurrentStatusItem = {
  date: string;
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const companyProfile = {
  headline: "담양을 기반으로 유기질비료와 퇴비 제품을 소개하는 수북농업 브랜드 사이트",
  summary:
    "수북농업의 회사 정보, 대표 이력, 공개 연혁, 2024~2026 최신 공개 정보, 제품 자료를 한 흐름으로 소개합니다.",
  verificationNote:
    "회사 자료와 농민신문·농기자재신문·영농자재신문 기사, 한국유기질비료산업협동조합 공개 연혁, 2026년 유기질비료 계약현황, 114On·NICEbizinfo 공개 사업자 정보를 바탕으로 주요 내용을 안내합니다.",
  companyOverview: [
    `${companyInfo.legalName}은 전라남도 담양군 담양읍 추성로 1030을 기반으로 한 법인입니다.`,
    `NICEbizinfo 기업정보에는 설립일이 ${companyInfo.establishmentDate}, 표준산업분류는 ${companyInfo.industryLabel}(${companyInfo.industryCode})로 안내됩니다.`,
    `한국유기질비료산업협동조합 조합원 검색에는 수북농업이 전남 지역 조합원으로 등록되어 있고, 생산비종은 ${companyInfo.productionCategory}로 안내됩니다.`,
    "대표 제품은 흙손, 흙보약, 무등산 3종이며, 사이트에서는 포장 이미지와 안내 자료를 함께 전합니다.",
    "2026년 유기질비료 계약현황 공개 자료에는 수북농업 제품으로 흙손 분상형, 흙손 입상형, 무등산 입상형, 흙보약 혼합유기질이 확인됩니다.",
    `${companyInfo.ceoName} 대표는 공개 기사에서 수북농업 대표이사와 수북환경개발 대표이사, 조합 활동과 지역 농업 단체 활동 이력으로 함께 소개됩니다.`,
  ],
} as const;

export const verifiedLeadershipTimeline: readonly TimelineItem[] = [
  {
    date: "2014.07.09",
    title: "한국유기질비료산업협동조합 제3대 이사장 취임",
    description:
      "한국유기질비료산업협동조합 공개 연혁은 2014년 7월 9일 김종수 대표가 제3대 이사장으로 취임했다고 안내합니다.",
    sourceLabel: "한국유기질비료산업협동조합 연혁",
    sourceUrl: "https://kofic92.or.kr/about/sub02",
  },
  {
    date: "2014.07.14",
    title: "한국유기질비료산업협동조합 신임 이사장 인터뷰 소개",
    description:
      "농민신문 인터뷰는 김종수 대표가 2014년 7월 9일 임시총회에서 조합 이사장으로 선출됐고, 조합원 화합과 질 좋은 제품 공급을 우선 과제로 제시했다고 전했습니다.",
    sourceLabel: "농민신문, 2014.07.14",
    sourceUrl: "https://www.nongmin.com/article/20140713094869",
  },
  {
    date: "2015.06.18",
    title: "품질 우선 기조를 공개적으로 밝힌 시기",
    description:
      "농기자재신문 인물포커스 기사에서 김종수 이사장은 원료부터 제품까지 품질을 우선해 신뢰를 쌓겠다는 방향을 소개했습니다.",
    sourceLabel: "농기자재신문, 2015.06.18",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8253",
  },
  {
    date: "2016.09.05",
    title: "한국유기질비료산업협동조합 제4대 이사장 재선출",
    description:
      "농민신문은 김종수 수북농업 대표가 제3대에 이어 제4대 이사장으로 재선출됐고, 정부 예산 증액과 환경시설 보조금 확보에 힘쓰겠다고 전했습니다.",
    sourceLabel: "농민신문, 2016.09.05",
    sourceUrl: "https://www.nongmin.com/article/20160903062432",
  },
  {
    date: "2019.03.14",
    title: "비료 공정규격 관련 업계 의견 전달",
    description:
      "영농자재신문은 김종수 이사장이 농촌진흥청에 비료 공정규격과 이물질 기준 관련 업계 의견을 전달했다고 보도했습니다.",
    sourceLabel: "영농자재신문, 2019.03.14",
    sourceUrl: "https://www.newsfm.kr/news/article_print.html?no=3557",
  },
  {
    date: "2020.08.07",
    title: "수북농업과 수북환경개발 대표 이력이 함께 소개된 시기",
    description:
      "영농자재신문 기사에는 김종수 대표가 수북농업 대표이사와 수북환경개발 대표이사로 함께 소개됐습니다.",
    sourceLabel: "영농자재신문, 2020.08.07",
    sourceUrl: "https://www.newsfm.kr/news/article_print.html?no=4987",
  },
  {
    date: "2021.02.24",
    title: "전남도친환경농산업연합회 제2부회장 선출",
    description:
      "농기자재신문은 (유)수북농업 김종수 대표가 전남도친환경농산업연합회 새 집행부에서 제2부회장으로 선출됐다고 전했습니다.",
    sourceLabel: "농기자재신문, 2021.02.24",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=32817",
  },
] as const;

export const latestPublicUpdates: readonly TimelineItem[] = [
  {
    date: "2024.08.25",
    title: "공식 조합 연혁 기준 제6대 김방식 이사장 취임",
    description:
      "한국유기질비료산업협동조합 공개 연혁은 2024년 8월 25일 제6대 김방식 이사장 취임을 안내합니다. 현재 공개 기록 기준 김종수 대표의 조합 이력은 제3·4대 이사장 기록으로 확인됩니다.",
    sourceLabel: "한국유기질비료산업협동조합 연혁",
    sourceUrl: "https://kofic92.or.kr/about/sub02",
  },
  {
    date: "2024.10.11",
    title: "공식 연혁에 최신 위원회 구성 기록이 반영된 시기",
    description:
      "한국유기질비료산업협동조합 공개 연혁은 2024년 10월 11일 인사위원회와 대기환경규제대책위원회 구성을 최신 기록으로 안내합니다.",
    sourceLabel: "한국유기질비료산업협동조합 연혁",
    sourceUrl: "https://kofic92.or.kr/about/sub02",
  },
  {
    date: "2026.03",
    title: "2026년 유기질비료 계약현황에 수북농업 제품이 등재된 시기",
    description:
      "담양군 공개 자료인 2026년 유기질비료 계약현황에는 수북농업 제품으로 흙손 분상형, 흙손 입상형, 무등산 입상형과 화순광역친환경영농조합법인 공급망의 흙보약 혼합유기질이 함께 확인됩니다.",
    sourceLabel: "2026년 유기질비료 계약현황",
    sourceUrl:
      "https://www.yd21.go.kr/kr/html/sub02/020112.html?file_id=172932&mode=D&no=4039518d214a947612e2c62109ca4aa2",
  },
] as const;

export const publicTimeline: readonly TimelineItem[] = [
  ...verifiedLeadershipTimeline,
  ...latestPublicUpdates,
] as const;

export const ceoCurrentStatus: readonly CurrentStatusItem[] = [
  {
    date: "2024.08.25",
    title: "조합 공개 연혁 기준 현재 체계",
    description:
      "한국유기질비료산업협동조합 공개 연혁은 2024년 8월 25일 제6대 김방식 이사장 취임을 안내합니다. 현재 공개 기준에서 김종수 대표의 조합 이력은 제3·4대 이사장 기록으로 확인됩니다.",
    sourceLabel: "한국유기질비료산업협동조합 연혁",
    sourceUrl: "https://kofic92.or.kr/about/sub02",
  },
  {
    date: "2026.03.03",
    title: "공개 사업자 정보 기준 현재 사업장 정보",
    description:
      `114On 공개 사업자 정보는 농업회사법인(유)수북농업의 주소를 ${companyInfo.address}, 사업자등록번호를 ${companyInfo.businessRegistrationNumber}로 안내합니다.`,
    sourceLabel: "114On 공개 사업자 정보",
    sourceUrl: "https://www.114.co.kr/biznumber/detail/f27099f463c1",
  },
] as const;

export const contractProducts2026 = [
  "흙손(수북농업-가축분1) 분상 20kg",
  "흙손(수북농업-가축분1입상) 입상 20kg",
  "무등산(수북농업-일반퇴비1 입상) 입상 20kg",
  "흙보약(수북농업-혼합유기질) 입상 20kg",
] as const;

export const historyFlowTimeline: readonly HistoryFlowItem[] = [
  {
    period: "2014.07.09",
    title: "조합 공개 연혁에 제3대 이사장 취임이 기록된 시기",
    description:
      "한국유기질비료산업협동조합 공개 연혁은 2014년 7월 9일 김종수 대표의 제3대 이사장 취임을 기록하고 있습니다.",
    image: {
      src: "/image/history/history-kofic-2014-07-09.png",
      alt: "한국유기질비료산업협동조합 연혁 페이지의 제3대 김종수 이사장 취임 기록 캡처",
    },
    sourceLabel: "한국유기질비료산업협동조합 연혁",
    sourceUrl: "https://kofic92.or.kr/about/sub02",
  },
  {
    period: "2014.07.14",
    title: "조합 이사장 선출 직후 인터뷰가 공개된 시기",
    description:
      "농민신문 인터뷰에는 김종수 대표가 전남퇴비생산자협의회장과 수북환경개발 대표로 소개됐고, 조합원 화합과 품질 좋은 제품 공급을 우선 과제로 제시한 내용이 실렸습니다.",
    image: {
      src: "/image/history/history-nongmin-2014-07-14.png",
      alt: "농민신문 2014년 7월 14일 김종수 신임 이사장 인터뷰 기사 캡처",
    },
    sourceLabel: "농민신문 2014.07.14",
    sourceUrl: "https://www.nongmin.com/article/20140713094869",
  },
  {
    period: "2015.06.18",
    title: "품질 우선 기조를 공개적으로 밝힌 시기",
    description:
      "농기자재신문 인물포커스 기사에서 김종수 이사장은 원료부터 제품까지 품질을 우선해 신뢰를 쌓겠다는 방향을 밝히고, 품질관리와 유통질서 정비 과제를 함께 설명했습니다.",
    image: {
      src: "/image/history/history-newsam-2015-06-18.png",
      alt: "농기자재신문 2015년 6월 18일 품질 우선 기조 기사 캡처",
    },
    sourceLabel: "농기자재신문 2015.06.18",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8253",
  },
  {
    period: "2016.09.05",
    title: "제4대 이사장 재선출로 활동이 이어진 시기",
    description:
      "농민신문은 김종수 수북농업 대표가 제4대 이사장으로 재선출됐고, 농업부산물 활용 활성화를 위한 예산 증액과 환경시설 보조금 확보에 힘쓰겠다는 입장을 함께 전했습니다.",
    image: {
      src: "/image/history/history-nongmin-2016-09-05.png",
      alt: "농민신문 2016년 9월 5일 제4대 이사장 재선출 기사 캡처",
    },
    sourceLabel: "농민신문 2016.09.05",
    sourceUrl: "https://www.nongmin.com/article/20160903062432",
  },
  {
    period: "2019.03.14",
    title: "비료 공정규격 관련 의견을 전달한 시기",
    description:
      "영농자재신문은 김종수 이사장이 농촌진흥청을 찾아 유기성 폐자원 재활용 확대와 비료 이물질 기준 조정 등 업계 의견을 전달했다고 보도했습니다.",
    image: {
      src: "/image/history/history-newsfm-2019-03-14.png",
      alt: "영농자재신문 2019년 3월 14일 비료 공정규격 의견 전달 기사 캡처",
    },
    sourceLabel: "영농자재신문 2019.03.14",
    sourceUrl: "https://www.newsfm.kr/news/article_print.html?no=3557",
  },
  {
    period: "2020.08.07",
    title: "수북농업과 수북환경개발 대표 이력이 함께 소개된 시기",
    description:
      "영농자재신문은 제5대 이사장 선거 기사에서 김종수 후보를 수북농업 대표이사와 수북환경개발 대표이사로 함께 소개했습니다.",
    image: {
      src: "/image/history/history-newsfm-2020-08-07.png",
      alt: "영농자재신문 2020년 8월 7일 수북농업과 수북환경개발 대표 이력 기사 캡처",
    },
    sourceLabel: "영농자재신문 2020.08.07",
    sourceUrl: "https://www.newsfm.kr/news/article_print.html?no=4987",
  },
  {
    period: "2021.02.24",
    title: "전남 지역 친환경농업 단체 활동이 공개된 시기",
    description:
      "농기자재신문은 (유)수북농업 김종수 대표가 전남도친환경농산업연합회 제2부회장으로 선출됐다고 보도했습니다.",
    image: {
      src: "/image/history/history-newsam-2021-02-24.png",
      alt: "농기자재신문 2021년 2월 24일 전남도친환경농산업연합회 제2부회장 선출 기사 캡처",
    },
    sourceLabel: "농기자재신문 2021.02.24",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=32817",
  },
  {
    period: "2024.08.25",
    title: "공식 조합 연혁 기준 현재 체제가 갱신된 시기",
    description:
      "한국유기질비료산업협동조합 공개 연혁은 2024년 8월 25일 제6대 김방식 이사장 취임을 기록합니다. 이 기록을 기준으로 김종수 대표의 조합 이력은 제3·4대 이사장 시기로 정리됩니다.",
    image: {
      src: "/image/history/history-kofic-2024-08-25.png",
      alt: "한국유기질비료산업협동조합 연혁 페이지의 2024년 8월 25일 제6대 이사장 취임 기록 캡처",
    },
    sourceLabel: "한국유기질비료산업협동조합 연혁",
    sourceUrl: "https://kofic92.or.kr/about/sub02",
  },
  {
    period: "2026.03.03",
    title: "공개 사업자 정보로 현재 사업장 정보가 정리된 시기",
    description:
      `114On 공개 사업자 정보에는 ${companyInfo.legalName}의 도로명 주소가 ${companyInfo.address}, 사업자등록번호가 ${companyInfo.businessRegistrationNumber}로 안내됩니다.`,
    image: {
      src: "/image/history/history-114on-2026-03-03.png",
      alt: "114On 공개 사업자 정보 페이지의 수북농업 기본 정보 표 캡처",
    },
    sourceLabel: "114On 공개 사업자 정보 2026.03.03",
    sourceUrl: "https://www.114.co.kr/biznumber/detail/f27099f463c1",
  },
] as const;

export const verifiedFactCards = [
  {
    title: "대표자",
    value: companyInfo.ceoName,
    description: "공개 사업자 정보와 기사 자료에 함께 소개된 대표자입니다.",
  },
  {
    title: "사업장",
    value: "전남 담양",
    description: companyInfo.address,
  },
  {
    title: "주요 제품",
    value: "흙손 · 흙보약 · 무등산",
    description: "대표 제품 3종을 사이트에서 함께 소개합니다.",
  },
  {
    title: "대표 연락처",
    value: companyInfo.telephoneDisplay,
    description: "전화, 휴대전화, 이메일 안내 제공",
  },
] as const;

export const companyRecordCards: readonly RecordCard[] = [
  {
    title: "설립일",
    value: companyInfo.establishmentDate,
    description: "NICEbizinfo 기업정보 기준",
  },
  {
    title: "사업자번호",
    value: companyInfo.businessRegistrationNumber,
    description: "114On 공개 사업자 정보 기준",
  },
  {
    title: "표준산업분류",
    value: companyInfo.industryCode,
    description: companyInfo.industryLabel,
  },
  {
    title: "공개 생산분류",
    value: companyInfo.productionCategory,
    description: "한국유기질비료산업협동조합 조합원 검색 기준",
  },
  {
    title: "공개 기준일",
    value: companyInfo.publicRecordUpdatedAt,
    description: "114On 공개 사업자 정보 최종 업데이트",
  },
] as const;

export const ceoBiography = [
  "2014년 7월 9일 한국유기질비료산업협동조합 임시총회에서 이사장으로 선출됐습니다.",
  "2014년 7월 14일 인터뷰에서는 조합원 화합과 질 좋은 제품 공급을 우선 과제로 소개했습니다.",
  "2015년 6월 18일 공개 기사에서 원료부터 제품까지 품질을 우선하겠다는 방향을 밝혔습니다.",
  "2016년 9월 5일 제3대에 이어 제4대 이사장으로 재선출됐습니다.",
  "2019년 3월 14일 영농자재신문 기사에서는 비료 공정규격과 이물질 기준 관련 업계 의견을 농촌진흥청에 전달한 내용이 소개됐습니다.",
  "2020년 8월 기사에는 수북농업 대표이사와 수북환경개발 대표이사 이력이 함께 실렸습니다.",
  "2021년 2월 24일 전남도친환경농산업연합회 제2부회장 선출 소식이 공개 기사로 확인됩니다.",
  "한국유기질비료산업협동조합 공개 연혁 기준 2024년 8월 25일부터는 제6대 김방식 이사장 체제로 안내되며, 김종수 대표의 조합 이력은 제3·4대 이사장 기록으로 확인됩니다.",
] as const;

export const publicSources: readonly PublicSource[] = [
  {
    label: "회사 소개서",
    detail: "사이트에 함께 비치한 회사 소개서 파일입니다.",
    url: "/company-brochure.hwp",
  },
  {
    label: "농민신문 2014.07.14",
    detail: "김종수 신임 이사장 인터뷰와 우선 과제 소개 기사",
    url: "https://www.nongmin.com/article/20140713094869",
  },
  {
    label: "농기자재신문 2014.07.17",
    detail: "조합 제3대 이사장 선출 소식을 전한 기사",
    url: "https://newsam.co.kr/news/article.html?no=7394",
  },
  {
    label: "한국유기질비료산업협동조합 연혁",
    detail: "2014년 제3대, 2016년 제4대 김종수 이사장 취임이 기록된 공개 연혁",
    url: "https://kofic92.or.kr/about/sub02",
  },
  {
    label: "한국유기질비료산업협동조합 조합원 검색",
    detail: "수북농업의 주소, 연락처, 생산비종이 안내된 공개 조합원 정보",
    url: "https://kofic92.or.kr/about/sub11?location=%EC%A0%84%EB%82%A8",
  },
  {
    label: "농기자재신문 2015.06.18",
    detail: "품질 우선 기조와 업계 과제를 소개한 인물포커스 기사",
    url: "https://www.newsam.co.kr/news/article.html?no=8253",
  },
  {
    label: "농민신문 2016.09.05",
    detail: "제4대 이사장 재선출과 주요 발언을 전한 기사",
    url: "https://www.nongmin.com/article/20160903062432",
  },
  {
    label: "영농자재신문 2019.03.14",
    detail: "비료 공정규격과 이물질 기준 관련 업계 의견 전달 기사",
    url: "https://www.newsfm.kr/news/article_print.html?no=3557",
  },
  {
    label: "영농자재신문 2020.08.07",
    detail: "제5대 이사장 선거 기사에 실린 수북농업·수북환경개발 대표 이력 소개",
    url: "https://www.newsfm.kr/news/article_print.html?no=4987",
  },
  {
    label: "농기자재신문 2021.02.24",
    detail: "전남도친환경농산업연합회 제2부회장 선출 기사",
    url: "https://www.newsam.co.kr/news/article.html?no=32817",
  },
  {
    label: "2026년 유기질비료 계약현황",
    detail: "수북농업 제품 흙손, 무등산, 흙보약이 확인되는 담양군 공개 자료",
    url: "https://www.yd21.go.kr/kr/html/sub02/020112.html?file_id=172932&mode=D&no=4039518d214a947612e2c62109ca4aa2",
  },
  {
    label: "114On 공개 사업자 정보",
    detail: "상호, 도로명 주소, 사업자등록번호가 안내된 공개 사업자 정보",
    url: "https://www.114.co.kr/biznumber/detail/f27099f463c1",
  },
  {
    label: "NICEbizinfo 기업정보",
    detail: "대표자, 설립일자, 표준산업분류를 포함한 기업 개요",
    url: "https://m.nicebizinfo.com/ep/EP0100M002GE.nice?kiscode=670760",
  },
] as const;

export const externalPhotoCredit = {
  label: "대표 사진",
  description: "김종수 대표",
  url: "https://www.nongmin.com/article/20160903062432",
} as const;
