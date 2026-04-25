export const category = {
  name: 'category',
  title: 'Danh mục',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tên danh mục', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Đường dẫn URL', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'description', title: 'Mô tả', type: 'text' },
    { name: 'image', title: 'Ảnh danh mục', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Thứ tự hiển thị', type: 'number', initialValue: 0 }
  ],
  preview: { select: { title: 'title', media: 'image' } }
}

export const banner = {
  name: 'banner',
  title: 'Banner trang chủ',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tiêu đề', type: 'string', validation: Rule => Rule.required() },
    { name: 'subtitle', title: 'Phụ đề', type: 'string' },
    { name: 'link', title: 'Đường dẫn khi click', type: 'string' },
    { name: 'image', title: 'Ảnh banner (Desktop)', type: 'image', options: { hotspot: true } },
    { name: 'imageMobile', title: 'Ảnh banner (Mobile)', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Thứ tự', type: 'number', initialValue: 0 }
  ],
  preview: { select: { title: 'title', media: 'image' } }
}

export const brand = {
  name: 'brand',
  title: 'Thương hiệu đồng hành',
  type: 'document',
  fields: [
    { name: 'name', title: 'Tên thương hiệu', type: 'string', validation: Rule => Rule.required() },
    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'order', title: 'Thứ tự', type: 'number', initialValue: 0 }
  ],
  preview: { select: { title: 'name', media: 'logo' } }
}

export const gallery = {
  name: 'gallery',
  title: 'Gallery Instagram',
  type: 'document',
  fields: [
    { name: 'title', title: 'Caption', type: 'string' },
    { name: 'image', title: 'Ảnh', type: 'image', options: { hotspot: true } },
    { name: 'link', title: 'Link Instagram', type: 'url' }
  ],
  preview: { select: { title: 'title', media: 'image' } }
}

export const whySection = {
  name: 'whySection',
  title: 'Vì sao được yêu thích',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tiêu đề', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Mô tả', type: 'text' },
    { name: 'image', title: 'Ảnh nền', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Thứ tự', type: 'number', initialValue: 0 }
  ],
  preview: { select: { title: 'title', media: 'image' } }
}

export const aboutPage = {
  name: 'aboutPage',
  title: 'Trang giới thiệu',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Ảnh hero', type: 'image', options: { hotspot: true } },
    { name: 'intro', title: 'Giới thiệu thương hiệu', type: 'array', of: [{ type: 'block' }] },
    { name: 'founderName', title: 'Tên founder', type: 'string' },
    { name: 'founderImage', title: 'Ảnh founder', type: 'image', options: { hotspot: true } },
    { name: 'founderMessage', title: 'Lời nhắn từ founder', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'coreValues',
      title: 'Giá trị cốt lõi',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Số thứ tự', type: 'number' },
          { name: 'title', title: 'Tên giá trị', type: 'string' },
          { name: 'description', title: 'Mô tả', type: 'text' },
          { name: 'image', title: 'Ảnh', type: 'image', options: { hotspot: true } }
        ]
      }]
    }
  ]
}

export const workshop = {
  name: 'workshop',
  title: 'Workshop & Academy',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tên khóa học', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Đường dẫn', type: 'slug', options: { source: 'title' } },
    { name: 'image', title: 'Ảnh', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Mô tả', type: 'array', of: [{ type: 'block' }] },
    { name: 'duration', title: 'Thời lượng', type: 'string' },
    { name: 'price', title: 'Học phí (VND)', type: 'number' },
    { name: 'schedule', title: 'Lịch học', type: 'string' },
    { name: 'maxStudents', title: 'Số học viên tối đa', type: 'number' }
  ],
  preview: { select: { title: 'title', media: 'image' } }
}

export const project = {
  name: 'project',
  title: 'Dự án',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tên dự án', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Đường dẫn', type: 'slug', options: { source: 'title' } },
    { name: 'coverImage', title: 'Ảnh bìa', type: 'image', options: { hotspot: true } },
    { name: 'images', title: 'Ảnh dự án', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'description', title: 'Mô tả', type: 'array', of: [{ type: 'block' }] },
    { name: 'client', title: 'Khách hàng', type: 'string' },
    { name: 'category', title: 'Loại sự kiện', type: 'string' },
    { name: 'date', title: 'Ngày thực hiện', type: 'date' }
  ],
  preview: { select: { title: 'title', media: 'coverImage' } }
}
