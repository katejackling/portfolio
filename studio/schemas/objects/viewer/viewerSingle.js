export default {
  name: 'viewerSingle',
  type: 'object',
  title: 'Single',
  fields: [
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [{ title: 'Contain', value: 'contain' }, { title: 'Cover', value: 'cover' }],
        layout: 'radio',
        direction: 'horizontal'
      },
      validation: Rule => Rule.required()
    },
    { title: 'Media', name: 'media', type: 'asset' }
  ],
  preview: {
    select: {
      media: 'media'
    },
    prepare({ heading, media }) {
      return {
        title: 'Single',
        media
      }
    }
  }
}
