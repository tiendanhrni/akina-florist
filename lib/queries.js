import { getSanityData } from './sanity'

export async function getBanners() {
  return getSanityData(`*[_type == "banner"] | order(order asc) {
    _id, _type, title, subtitle, link,
    "image": image.asset->url, "imageMobile": imageMobile.asset->url, order
  }`)
}

export async function getCategories() {
  return getSanityData(`*[_type == "category" && isPublished != false] | order(order asc) {
    _id, _type, title, slug, description, "image": image.asset->url, order
  }`)
}

export async function getProductsByCategory(categorySlug) {
  return getSanityData(`*[_type == "product" && isPublished != false && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id, _type, name, code, price, priceNote, isBestSeller,
    "slug": slug.current, "categorySlug": category->slug.current,
    "image": images[0].asset->url, "hoverImage": images[1].asset->url, tags
  }`, { categorySlug })
}

export async function getBestSellers() {
  return getSanityData(`*[_type == "product" && isPublished != false && isBestSeller == true] | order(_createdAt desc) [0...8] {
    _id, _type, name, code, price, priceNote,
    "slug": slug.current, "categorySlug": category->slug.current,
    "image": images[0].asset->url, "hoverImage": images[1].asset->url
  }`)
}

export async function getProduct(categorySlug, productSlug) {
  return getSanityData(`*[_type == "product" && isPublished != false && slug.current == $productSlug && category->slug.current == $categorySlug][0] {
    _id, _type, name, code, price, priceNote, description, shipmentInfo, usage, note,
    "slug": slug.current, "category": category->{title, "slug": slug.current},
    "images": images[].asset->url, tags, colors, occasions, sizes
  }`, { categorySlug, productSlug })
}

export async function getRelatedProducts(categorySlug, currentSlug) {
  return getSanityData(`*[_type == "product" && isPublished != false && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(_createdAt desc) [0...4] {
    _id, _type, name, code, price, priceNote,
    "slug": slug.current, "categorySlug": category->slug.current,
    "image": images[0].asset->url, "hoverImage": images[1].asset->url
  }`, { categorySlug, currentSlug })
}

export async function getAboutPage() {
  return getSanityData(`*[_type == "aboutPage"][0] {
    _id, _type, heroImage, founderName, founderMessage,
    "heroImageUrl": heroImage.asset->url, "founderImageUrl": founderImage.asset->url, coreValues
  }`)
}

export async function getBrands() {
  return getSanityData(`*[_type == "brand"] | order(order asc) {
    _id, _type, name, "logo": logo.asset->url, order
  }`)
}

export async function getGallery() {
  return getSanityData(`*[_type == "gallery" && isPublished != false] | order(_createdAt desc) [0...9] {
    _id, _type, title, link, "image": image.asset->url
  }`)
}

export async function getWhySection() {
  return getSanityData(`*[_type == "whySection"] | order(order asc) {
    _id, _type, title, description, "image": image.asset->url, order
  }`)
}

export async function getWorkshops() {
  return getSanityData(`*[_type == "workshop" && isPublished != false] | order(_createdAt desc) {
    _id, _type, title, description, duration, price, schedule, maxStudents,
    "slug": slug.current, "image": image.asset->url
  }`)
}

export async function getProjects() {
  return getSanityData(`*[_type == "project" && isPublished != false] | order(date desc) {
    _id, _type, title, client, category, date,
    "slug": slug.current, "cover": coverImage.asset->url
  }`)
}

// ─── BLOG ───────────────────────────────────

export async function getBlogs({ limit = 12, offset = 0, category = null } = {}) {
  const categoryFilter = category ? `&& $category in categories[]->slug.current` : ''
  return getSanityData(
    `*[_type == "blog" && isPublished != false && status == "published" ${categoryFilter}] | order(publishedAt desc) [$offset...$end] {
      _id, _type, title, excerpt, author, publishedAt, tags,
      "categories": categories[]->{_id, title, "slug": slug.current},
      "slug": slug.current, "cover": coverImage.asset->url
    }`,
    { offset, end: offset + limit, ...(category ? { category } : {}) }
  )
}

export async function getBlog(slug) {
  return getSanityData(
    `*[_type == "blog" && isPublished != false && slug.current == $slug][0] {
      _id, _type, title, excerpt, author, publishedAt, tags, status,
      "categories": categories[]->{_id, title, "slug": slug.current},
      "slug": slug.current, "cover": coverImage.asset->url,
      seoTitle, seoDescription,
      body[] {
        ...,
        _type == "image" => { ..., "url": asset->url }
      }
    }`,
    { slug }
  )
}

export async function getRelatedBlogs(currentSlug, categories = []) {
  return getSanityData(
    `*[_type == "blog" && isPublished != false && status == "published" && slug.current != $currentSlug && count((categories)[@ in $categories]) > 0] | order(publishedAt desc) [0...3] {
      _id, title, publishedAt, "slug": slug.current, "cover": coverImage.asset->url
    }`,
    { currentSlug, categories }
  )
}

// ─── SITE SETTINGS ───────────────────────────────────

export async function getSiteSettings() {
  return getSanityData(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id, _type,
    siteName, "logoUrl": logo.asset->url,
    hotline, zaloUrl, messengerUrl,
    facebook, instagram, tiktok,
    stores, copyright,
    navLabels, footerLinks, mobileNavLabels,
    preHeaderText, preHeaderLinkText, preHeaderLinkUrl,
    homeVideo {
      "videoFile": videoFile.asset->url,
      videoUrl,
      "posterImage": posterImage.asset->url,
    },
    storyHeading, storySubheading, storyParagraphs,
    whySectionTitle,
    shopPageTitle, shopPageSubtitle, shopPageIntro,
    productPage, categoryPage,
    aboutIntro, founderRole, founderQuote, coreValues, valuesSection,
    workshopIntro, workshopPage,
    projectPage,
    blogPage,
    policies,
    notFoundPage,
    seoTitle, seoDescription, seoKeywords,
    "ogImage": ogImage.asset->url,
    googleVerification, googleAnalyticsId,
  }`)
}
// ─── PAGE BUILDER ────────────────────────────────────

export async function getPageSlugs() {
  return getSanityData(`*[_type == "page" && isPublished == true] { "slug": slug.current }`)
}

export async function getPage(slug) {
  return getSanityData(
    `*[_type == "page" && slug.current == $slug][0] {
      _id, _type, title, isPublished, showInNav, navLabel,
      seoTitle, seoDescription, "ogImage": ogImage.asset->url,
      blocks[] {
        ...,
        _type == "heroBlock" => { ..., "backgroundImage": backgroundImage.asset->url },
        _type == "imageBlock" => { ..., images[] { ..., "image": image.asset->url } },
        _type == "imageTextBlock" => { ..., "image": image.asset->url },
        _type == "galleryBlock" => { ..., images[] { ..., "image": image.asset->url } },
        _type == "videoBlock" => { ..., "videoFile": videoFile.asset->url },
        _type == "productsBlock" => {
          ...,
          products[]-> {
            _id, name, code, price, priceNote,
            "slug": slug.current,
            "categorySlug": category->slug.current,
            "image": images[0].asset->url,
          }
        },
      }
    }`,
    { slug }
  )
}

export async function getNavPages() {
  return getSanityData(`*[_type == "page" && isPublished == true && showInNav == true] | order(_createdAt asc) {
    title, navLabel, "slug": slug.current
  }`)
}

export async function getBlogCategories() {
  return getSanityData(`*[_type == "blogCategory" && isPublished != false] | order(order asc) {
    _id, title, "slug": slug.current, description
  }`)
}
