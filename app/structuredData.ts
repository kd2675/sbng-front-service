import { companyInfo } from "./companyInfo";
import { historyFlowTimeline } from "./companyProfile";
import { productCatalog } from "./productCatalog";
import { absoluteUrl, buildWebPageJsonLd, siteConfig } from "./siteConfig";

/**
 * 전역에서 재사용 가능한 Organization 엔티티.
 * layout.tsx 와 각 페이지 구조화 데이터에서 동일한 객체를 공유해,
 * 필드 누락/중복 정의로 인한 불일치를 방지합니다.
 */
export function buildOrganizationEntity() {
  return {
    "@type": "Organization",
    name: siteConfig.siteName,
    alternateName: companyInfo.legalName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl(siteConfig.organizationLogoPath),
    image: absoluteUrl("/image/company/subuk-facility-2015-share.jpg"),
    foundingDate: "1996-03-30",
    description: siteConfig.defaultDescription,
    knowsAbout: ["유기질비료", "퇴비", "토양개량", "농업 자재"],
    telephone: companyInfo.telephoneDisplay,
    identifier: companyInfo.businessRegistrationNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressLocality: companyInfo.addressLocality,
      addressRegion: companyInfo.addressRegion,
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      url: absoluteUrl("/contact"),
      telephone: companyInfo.telephoneDisplay,
      contactType: "customer support",
      areaServed: "KR",
      availableLanguage: ["ko"],
    },
  };
}

/**
 * 전역 Organization 스키마 (@context 포함).
 * layout.tsx 에서 직접 JSON 직렬화할 때 사용합니다.
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...buildOrganizationEntity(),
  };
}

/**
 * 전역 WebSite 스키마 (@context 포함).
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    inLanguage: "ko-KR",
  };
}

export function buildAboutPageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "수북농업 회사 소개",
      description:
        "1996년 설립한 수북농업의 회사 개요, 유기질비료·퇴비 사업, 생산 현장, 담양 사업장과 회사 자료를 안내합니다.",
      path: "/about",
    }),
    "@type": "AboutPage",
    primaryImageOfPage: absoluteUrl(
      "/image/company/subuk-facility-2015-share.jpg",
    ),
    mainEntity: buildOrganizationEntity(),
  };
}

export function buildContactPageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "수북농업 문의하기",
      description: `수북농업 대표전화 ${companyInfo.telephoneDisplay}, ${companyInfo.businessHours}, 담양 사업장 주소와 회사 정보를 안내합니다.`,
      path: "/contact",
    }),
    "@type": "ContactPage",
    mainEntity: buildOrganizationEntity(),
  };
}

export function buildCeoProfilePageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "김종수 대표 소개",
      description:
        "수북농업 김종수 대표의 경영 방향, 주요 경력, 유기질비료 산업과 지역 농업 분야의 활동을 소개합니다.",
      path: "/ceo",
    }),
    "@type": "ProfilePage",
    primaryImageOfPage: absoluteUrl("/image/kim-jong-su-portrait.jpg"),
    mainEntity: {
      "@type": "Person",
      name: companyInfo.ceoName,
      image: absoluteUrl("/image/kim-jong-su-portrait.jpg"),
      description:
        "수북농업과 수북환경개발을 이끌며 공개 기사와 조합 연혁에 이름이 확인되는 대표입니다.",
      jobTitle: "수북농업 대표이사",
      worksFor: buildOrganizationEntity(),
    },
  };
}

export function buildProductsCollectionPageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "흙손 흙보약 무등산 제품 소개",
      description:
        "수북농업의 흙손, 흙보약, 무등산 제품 라인업과 포장 이미지, 안내 시트, 주요 사용 정보를 소개합니다.",
      path: "/products",
    }),
    "@type": "CollectionPage",
    primaryImageOfPage: absoluteUrl("/image/heukboyak-front.jpeg"),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: productCatalog.length,
      itemListElement: productCatalog.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.summary,
          image: [
            absoluteUrl(product.frontImage),
            absoluteUrl(product.backImage),
            absoluteUrl(product.sheetImage),
          ],
          brand: {
            "@type": "Brand",
            name: siteConfig.siteName,
          },
          category: product.category,
          sku: product.id,
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "포장단위",
              value: product.packUnit,
            },
            {
              "@type": "PropertyValue",
              name: "성상",
              value: product.form,
            },
            {
              "@type": "PropertyValue",
              name: "사용 기준",
              value: product.usage,
            },
          ],
          url: absoluteUrl(`/products#product-${product.id}`),
        },
      })),
    },
  };
}

export function buildHistoryCollectionPageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "수북농업 연혁",
      description:
        "1996년 설립부터 이어온 수북농업과 김종수 대표의 발자취를 사진과 출처가 연결된 타임라인으로 소개합니다.",
      path: "/history",
    }),
    "@type": "CollectionPage",
    primaryImageOfPage: absoluteUrl(
      "/image/history/history-weeklypeople-2020-02-03-main.jpg",
    ),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: historyFlowTimeline.length,
      itemListElement: historyFlowTimeline.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: `${item.period} ${item.title}`,
          description: item.description,
          image: absoluteUrl(item.image.src),
          url: absoluteUrl(
            `/history#history-${item.period.replaceAll(".", "-")}`,
          ),
        },
      })),
    },
  };
}
