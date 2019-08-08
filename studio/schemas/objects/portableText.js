export default {
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }, { title: 'Italic', value: 'italic' }],
      marks: {
        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
        annotations: [{ type: 'link' }, { type: 'internalLink' }]
      }
    }
  ]
}
