export default {
  name: 'introPair',
  type: 'object',
  title: 'Pair',
  fields: [
    {
      type: 'reference',
      name: 'reference_left',
      to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
    },
    { title: 'Media', name: 'media_left', type: 'asset' },
    {
      type: 'reference',
      name: 'reference_right',
      to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
    },
    { title: 'Media', name: 'media_right', type: 'asset' }
  ],
  preview: {
    select: {
      media: 'media'
    },
    prepare({ heading, media }) {
      return {
        title: 'Pair',
        media
      }
    }
  }
}
