export default {
  name: 'viewerPair',
  type: 'object',
  title: 'Pair',
  fields: [
    { title: 'Media', name: 'media_left', type: 'asset' },
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
