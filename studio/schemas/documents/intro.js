import { MdSentimentSatisfied } from 'react-icons/lib/md'

export default {
  name: 'intro',
  type: 'document',
  title: 'Intro',
  icon: MdSentimentSatisfied,
  __experimental_actions: ['create', /* delete, */ 'update', 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
      readOnly: true,
      hidden: true
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'intro100' }, { type: 'intro75' }, { type: 'intro50' }, { type: 'introPair' }]
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'openGraphImage'
    }
  }
}
