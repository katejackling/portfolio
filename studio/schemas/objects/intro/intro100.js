export default {
  name: 'intro100',
  type: 'object',
  title: 'Full Width',
  fields: [
    {
      type: 'reference',
      name: 'reference',
      to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
    },
    { title: 'Media', name: 'media', type: 'asset' }
  ],
  preview: {
    select: {
      media: 'media'
    },
    prepare({ heading, media }) {
      return {
        title: 'Full Width',
        media
      }
    }
  }
}
