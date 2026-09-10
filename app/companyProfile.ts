import { companyInfo } from "./companyInfo";

type PublicSource = {
  label: string;
  detail: string;
  url?: string;
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

export const historyFlowTimeline: readonly HistoryFlowItem[] = [
  {
    period: "1996.03.30",
    title: "담양에서 수북농업 설립",
    description:
      "수북농업은 1996년 담양에서 설립됐습니다. 설립일은 NICEbizinfo 기업정보에 기재되어 있으며, 2020년 주간인물 인터뷰에도 회사의 설립과 성장 과정이 소개되어 있습니다.",
    image: { src: "/image/logo-only-svg.svg", alt: "수북농업 로고" },
    sourceLabel: "NICEbizinfo 기업정보",
    sourceUrl: "https://m.nicebizinfo.com/ep/EP0100M002GE.nice?kiscode=670760",
  },
  {
    period: "2014.07.09",
    title: "유기질비료산업협동조합 제3대 이사장 취임",
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
    title: "조합 운영 방향 인터뷰",
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
    title: "품질 중심 경영 방향 소개",
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
    title: "비료 공정규격 개선 의견 전달",
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
    period: "2020.02.03",
    title: "수북농업의 설립과 성장 과정 소개",
    description:
      "주간인물은 김종수 대표 인터뷰에서 1996년 수북농업 설립, 1998년 농협중앙회 우수 퇴비생산업체 선정, 2012년 농림수산식품부 장관 표창, 2019년 환경부 장관 표창 이력을 함께 소개했습니다.",
    image: {
      src: "/image/history/history-weeklypeople-2020-02-03-main.jpg",
      alt: "주간인물 2020년 2월 3일 김종수 인터뷰 기사에 실린 사진",
    },
    sourceLabel: "주간인물 2020.02.03",
    sourceUrl: "http://weeklypeople.co.kr/news/view.php?no=2086",
  },
  {
    period: "2020.08.07",
    title: "수북농업·수북환경개발 대표 이력 소개",
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
    title: "전남 친환경농산업연합회 활동",
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
    period: "2023.01.19",
    title: "담양군 장학금 기탁",
    description:
      "대한기자협회 광주전남협회 담양군지회 기사에는 가축분퇴비 생산업체 일동의 장학금 기탁이 보도됐고, (유)수북농업은 250만원 기탁 기업으로 함께 소개됐습니다.",
    image: {
      src: "/image/history/history-jgkoreaja-2023-01-19.jpg",
      alt: "대한기자협회 광주전남협회 담양군지회 기사에 실린 장학금 기탁 사진",
    },
    sourceLabel: "대한기자협회 광주전남협회 2023.01.19",
    sourceUrl: "http://www.jgkoreaja.com/article.asp?aid=167411243060801023",
  },
  {
    period: "2024.08.25",
    title: "조합 이사장 활동 기록",
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
    title: "공개 사업장 정보",
    description: `114On 공개 사업자 정보에는 ${companyInfo.legalName}의 도로명 주소가 ${companyInfo.address}, 사업자등록번호가 ${companyInfo.businessRegistrationNumber}로 안내됩니다.`,
    image: {
      src: "/image/history/history-114on-2026-03-03.png",
      alt: "114On 공개 사업자 정보 페이지의 수북농업 기본 정보 표 캡처",
    },
    sourceLabel: "114On 공개 사업자 정보 2026.03.03",
    sourceUrl: "https://www.114.co.kr/biznumber/detail/f27099f463c1",
  },
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
    label: "농기자재신문 2015.12.31",
    detail: "담양 수북농업의 생산 시설과 과정을 담은 현장 탐방 기사",
    url: "https://www.newsam.co.kr/news/article.html?no=8732",
  },
  {
    label: "대한기자협회 광주전남협회 2023.01.19",
    detail:
      "담양군 장학금 기탁 기사에 (유)수북농업 250만원 기탁 내용이 소개된 자료",
    url: "http://www.jgkoreaja.com/article.asp?aid=167411243060801023",
  },
  {
    label: "농기자재신문 2015.07.31",
    detail:
      "차세대리더들의 모임 기사에 김건영(수북농업) 참석이 확인되는 공개 사진 자료",
    url: "https://www.newsam.co.kr/news/article.html?no=8385",
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
    label: "주간인물 2020.02.03",
    detail:
      "김종수 대표 인터뷰에 1996년 수북농업 설립, 1998년 우수 퇴비생산업체 선정, 정부 표창 이력이 함께 소개된 기사",
    url: "http://weeklypeople.co.kr/news/view.php?no=2086",
  },
  {
    label: "영농자재신문 2020.08.07",
    detail:
      "제5대 이사장 선거 기사에 실린 수북농업·수북환경개발 대표 이력 소개",
    url: "https://www.newsfm.kr/news/article_print.html?no=4987",
  },
  {
    label: "농기자재신문 2021.02.24",
    detail: "전남도친환경농산업연합회 제2부회장 선출 기사",
    url: "https://www.newsam.co.kr/news/article.html?no=32817",
  },
  {
    label: "2026년 유기질비료 계약현황",
    detail: "수북농업 제품 흙손, 무등산, 흙보약이 확인되는 공개 계약현황 자료",
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
