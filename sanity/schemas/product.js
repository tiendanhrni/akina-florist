export default {
  name: 'product',
  title: 'Sản phẩm',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tên sản phẩm',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'code',
      title: 'Mã sản phẩm',
      type: 'string',
      description: 'Ví dụ: HB011, L001'
    },
    {
      name: 'slug',
      title: 'Đường dẫn URL',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Ảnh sản phẩm',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Ảnh đầu tiên là ảnh chính, ảnh thứ 2 hiện khi hover'
    },
    {
      name: 'price',
      title: 'Giá (VND)',
      type: 'number',
      description: 'Để trống nếu giá liên hệ'
    },
    {
      name: 'priceNote',
      title: 'Ghi chú giá',
      type: 'string',
      description: 'Ví dụ: Liên hệ, Giá từ...'
    },
    {
      name: 'isBestSeller',
      title: 'Bán chạy',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'description',
      title: 'Mô tả sản phẩm',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'shipmentInfo',
      title: 'Thông tin giao hàng',
      type: 'text'
    },
    {
      name: 'usage',
      title: 'Cách sử dụng',
      type: 'text'
    },
    {
      name: 'note',
      title: 'Lưu ý',
      type: 'text'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'colors',
      title: 'Màu sắc',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'occasions',
      title: 'Theo dịp',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'sizes',
      title: 'Kích thước',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
      media: 'images.0'
    }
  }
}
