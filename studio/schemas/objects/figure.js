export default {
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    metadata: ['lqip', 'palette']
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url'
    }
  }
}
