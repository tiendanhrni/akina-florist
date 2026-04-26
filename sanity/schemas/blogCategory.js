export default {
  name: 'blogCategory',
  title: 'Danh mục Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên danh mục',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ví dụ: Nghệ thuật cắm hoa, Tips & Tricks',
    },
    {
      name: 'slug',
      title: 'Đường dẫn (không dấu, không space)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'Tự động tạo từ tên — nhấn Generate',
    },
    {
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 2,
    },
    {
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      initialValue: 0,
      description: 'Số nhỏ hơn hiển thị trước',
    },
    {
      name: 'isPublished',
      title: '🟢 Hiển thị trên website',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
  orderings: [
    { title: 'Thứ tự', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
