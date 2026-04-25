import { getSanityData } from './sanity'

// Banner trang chủ
export async function getBanners() {
  return getSanityData(`*[_type == "banner"] | order(order asc) {
    _id, _type, title, subtitle, link,
    "image": image.asset->url,
    "imageMobile": imageMobile.asset->url,
    order
  }`)
}

// Danh mục
export async function getCategories() {
  return getSanityData(`*[_type == "category"] | order(order asc) {
    _id, _type, title, slug, description,
    "image": image.asset->url,
    order
  }`)
}

// Sản phẩm theo danh mục
export async function getProductsByCategory(categorySlug) {
  return getSanityData(`*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id, _type, name, code, price, priceNote, isBestSeller,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "image": images[0].asset->url,
    "hoverImage": images[1].asset->url,
    tags
  }`, { categorySlug })
}

// Sản phẩm bán chạy
export async function getBestSellers() {
  return getSanityData(`*[_type == "product" && isBestSeller == true] | order(_createdAt desc) [0...8] {
    _id, _type, name, code, price, priceNote,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "image": images[0].asset->url,
    "hoverImage": images[1].asset->url
  }`)
}

// Chi tiết sản phẩm
export async function getProduct(categorySlug, productSlug) {
  return getSanityData(`*[_type == "product" && slug.current == $productSlug && category->slug.current == $categorySlug][0] {
    _id, _type, name, code, price, priceNote, description,
    shipmentInfo, usage, note,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    "images": images[].asset->url,
    tags, colors, occasions, sizes
  }`, { categorySlug, productSlug })
}

// Sản phẩm liên quan
export async function getRelatedProducts(categorySlug, currentSlug) {
  return getSanityData(`*[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(_createdAt desc) [0...4] {
    _id, _type, name, code, price, priceNote,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "image": images[0].asset->url,
    "hoverImage": images[1].asset->url
  }`, { categorySlug, currentSlug })
}

// Trang giới thiệu
export async function getAboutPage() {
  return getSanityData(`*[_type == "aboutPage"][0] {
    _id, _type,
    heroImage, founderName, founderMessage,
    "heroImageUrl": heroImage.asset->url,
    "founderImageUrl": founderImage.asset->url,
    coreValues
  }`)
}

// Thương hiệu
export async function getBrands() {
  return getSanityData(`*[_type == "brand"] | order(order asc) {
    _id, _type, name, "logo": logo.asset->url, order
  }`)
}

// Gallery Instagram
export async function getGallery() {
  return getSanityData(`*[_type == "gallery"] | order(_createdAt desc) [0...9] {
    _id, _type, title, link,
    "image": image.asset->url
  }`)
}

// Vì sao được yêu thích
export async function getWhySection() {
  return getSanityData(`*[_type == "whySection"] | order(order asc) {
    _id, _type, title, description,
    "image": image.asset->url,
    order
  }`)
}

// Workshop
export async function getWorkshops() {
  return getSanityData(`*[_type == "workshop"] | order(_createdAt desc) {
    _id, _type, title, description, duration, price, schedule, maxStudents,
    "slug": slug.current,
    "image": image.asset->url
  }`)
}

// Dự án
export async function getProjects() {
  return getSanityData(`*[_type == "project"] | order(date desc) {
    _id, _type, title, client, category, date,
    "slug": slug.current,
    "cover": coverImage.asset->url
  }`)
}

// Cài đặt toàn bộ website (singleton)
export async function getSiteSettings() {
  return getSanityData(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id, _type,
    siteName,
    "logoUrl": logo.asset->url,
    hotline, zaloUrl, messengerUrl,
    facebook, instagram, tiktok,
    stores, copyright,
    preHeaderText, preHeaderLinkText, preHeaderLinkUrl,
    homeVideo {
      "videoFile": videoFile.asset->url,
      videoUrl,
      "posterImage": posterImage.asset->url,
    },
    storyHeading, storySubheading, storyParagraphs,
    whySectionTitle,
    shopPageTitle, shopPageSubtitle, shopPageIntro,
    aboutIntro, founderRole, founderQuote, coreValues,
    workshopIntro,
    policies,
    seoTitle, seoDescription, seoKeywords,
    "ogImage": ogImage.asset->url,
    googleVerification,
  }`)
}
