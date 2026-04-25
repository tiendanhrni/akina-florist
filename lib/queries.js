import { getSanityData } from './sanity'

// Lấy tất cả banner trang chủ
export async function getBanners() {
  return getSanityData(`*[_type == "banner"] | order(order asc) {
    _id, title, subtitle, link,
    "image": image.asset->url
  }`)
}

// Lấy tất cả danh mục
export async function getCategories() {
  return getSanityData(`*[_type == "category"] | order(order asc) {
    _id, title, slug, description,
    "image": image.asset->url
  }`)
}

// Lấy sản phẩm theo danh mục
export async function getProductsByCategory(categorySlug) {
  return getSanityData(`*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id, name, code, price, priceNote, isBestSeller,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "image": images[0].asset->url,
    "hoverImage": images[1].asset->url,
    tags
  }`, { categorySlug })
}

// Lấy tất cả sản phẩm bán chạy
export async function getBestSellers() {
  return getSanityData(`*[_type == "product" && isBestSeller == true] | order(_createdAt desc) [0...8] {
    _id, name, code, price, priceNote,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "image": images[0].asset->url,
    "hoverImage": images[1].asset->url
  }`)
}

// Lấy chi tiết 1 sản phẩm
export async function getProduct(categorySlug, productSlug) {
  return getSanityData(`*[_type == "product" && slug.current == $productSlug && category->slug.current == $categorySlug][0] {
    _id, name, code, price, priceNote, description,
    shipmentInfo, usage, note,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    "images": images[].asset->url,
    tags, colors, occasions, sizes
  }`, { categorySlug, productSlug })
}

// Lấy sản phẩm liên quan
export async function getRelatedProducts(categorySlug, currentSlug) {
  return getSanityData(`*[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(_createdAt desc) [0...4] {
    _id, name, code, price, priceNote,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "image": images[0].asset->url,
    "hoverImage": images[1].asset->url
  }`, { categorySlug, currentSlug })
}

// Lấy thông tin trang giới thiệu
export async function getAboutPage() {
  return getSanityData(`*[_type == "aboutPage"][0] {
    heroImage, founderName, founderMessage,
    "heroImageUrl": heroImage.asset->url,
    "founderImageUrl": founderImage.asset->url,
    coreValues
  }`)
}

// Lấy danh sách thương hiệu đồng hành
export async function getBrands() {
  return getSanityData(`*[_type == "brand"] | order(order asc) {
    _id, name, "logo": logo.asset->url
  }`)
}

// Lấy danh sách gallery Instagram
export async function getGallery() {
  return getSanityData(`*[_type == "gallery"] | order(_createdAt desc) [0...5] {
    _id, title, link,
    "image": image.asset->url
  }`)
}

// Lấy section "Vì sao được yêu thích"
export async function getWhySection() {
  return getSanityData(`*[_type == "whySection"] | order(order asc) {
    _id, title, description,
    "image": image.asset->url
  }`)
}
