export default {
  name: 'intro75',
  type: 'object',
  title: '3/4 Width',
  fields: [
    {
      type: 'reference',
      name: 'reference',
      to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
    },
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [{ title: 'Left', value: 'left' }, { title: 'Right', value: 'right' }],
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
        title: '3/4 Width',
        media
      }
    }
  }
}
