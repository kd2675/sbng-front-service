import { companyInfo } from "./companyInfo";
import { historyFlowTimeline } from "./companyProfile";
import { productCatalog, type ProductCatalogEntry } from "./productCatalog";
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
    email: companyInfo.emailDisplay,
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
      telephone: companyInfo.telephoneDisplay,
      email: companyInfo.emailDisplay,
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
      name: "수북농업 회사 정보",
      description:
        "수북농업 회사 소개, 담양 사업장 정보, 공개 사업자 정보, 현장 사진과 업계 활동 자료를 소개합니다.",
      path: "/about",
    }),
    "@type": "AboutPage",
    primaryImageOfPage: absoluteUrl("/image/company/subuk-facility-2015-share.jpg"),
    mainEntity: buildOrganizationEntity(),
  };
}

export function buildCeoProfilePageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "김종수 대표 소개",
      description:
        "수북농업 김종수 대표의 주요 활동, 공개 연혁, 수북환경개발 관련 역할과 현재 공개 기록을 소개합니다.",
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

export function buildProductDetailPageJsonLd(product: ProductCatalogEntry) {
  return {
    ...buildWebPageJsonLd({
      name: `${product.name} 제품 소개`,
      description: product.summary,
      path: `/products/${product.id}`,
    }),
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
    url: absoluteUrl(`/products/${product.id}`),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "제품명",
        value: product.displayName,
      },
      {
        "@type": "PropertyValue",
        name: "성상",
        value: product.form,
      },
      {
        "@type": "PropertyValue",
        name: "자재명",
        value: product.material,
      },
      {
        "@type": "PropertyValue",
        name: "포장단위",
        value: product.packUnit,
      },
      {
        "@type": "PropertyValue",
        name: "사용 기준",
        value: product.usage,
      },
      {
        "@type": "PropertyValue",
        name: "보증 성분량",
        value: product.guarantee,
      },
    ],
  };
}

export function buildHistoryCollectionPageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "수북농업 연혁",
      description:
        "김종수 대표와 수북농업의 공개 기사, 사업자 정보, 회사 자료를 바탕으로 연혁 흐름을 사진과 함께 소개합니다.",
      path: "/history",
    }),
    "@type": "CollectionPage",
    primaryImageOfPage: absoluteUrl("/image/history/history-weeklypeople-2020-02-03-main.jpg"),
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
          url: absoluteUrl(`/history#history-${item.period.replaceAll(".", "-")}`),
        },
      })),
    },
  };
}

export function buildContactPageJsonLd() {
  return {
    ...buildWebPageJsonLd({
      name: "수북농업 문의",
      description:
        "수북농업 본사 연락처, 이메일, 휴대전화, 상담 문의 접수 창구와 담양 사업장 정보를 안내합니다.",
      path: "/contact",
    }),
    "@type": "ContactPage",
    primaryImageOfPage: absoluteUrl("/image/ceo-card.png"),
    mainEntity: buildOrganizationEntity(),
  };
}
