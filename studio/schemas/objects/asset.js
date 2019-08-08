import conditionalFields from '../../components/conditionalFieldsCustomInputComponent'

export default {
  name: 'asset',
  type: 'object',
  title: 'Asset',
  fields: [
    {
      title: 'Asset',
      name: 'aFieldWithConditions',
      type: 'object',
      inputComponent: conditionalFields,
      fields: [
        {
          title: 'Is video?',
          name: 'condition',
          type: 'boolean'
        },
        {
          name: 'video',
          type: 'mux'
        },
        {
          name: 'image',
          type: 'figure'
        }
      ]
    }
  ]
}
