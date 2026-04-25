'use client'
// components/VisualEditing.js
// Thanh công cụ nổi xuất hiện khi đang ở Preview Mode
// Cho phép click vào text/ảnh → Studio mở đúng field đó

import { VisualEditing } from 'next-sanity'
import { useEffect } from 'react'

export default function VisualEditingComponent() {
  useEffect(() => {
    // Thêm style cho overlay Visual Editing
    const style = document.createElement('style')
    style.textContent = `
      [data-sanity-overlay-element] {
        outline: 2px dashed rgba(87, 112, 87, 0.5) !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
        transition: outline-color 0.2s !important;
      }
      [data-sanity-overlay-element]:hover {
        outline-color: #577057 !important;
        outline-width: 2px !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return <VisualEditing />
}
