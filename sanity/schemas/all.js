import product from './product'
import siteSettings from './siteSettings'
import {
  category,
  banner,
  brand,
  gallery,
  whySection,
  aboutPage,
  workshop,
  project,
} from './index'

export const schemaTypes = [
  // Cài đặt chung (singleton)
  siteSettings,
  // Nội dung
  product,
  category,
  banner,
  brand,
  gallery,
  whySection,
  aboutPage,
  workshop,
  project,
]
