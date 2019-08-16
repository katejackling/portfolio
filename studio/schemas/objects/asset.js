import conditionalFields from '../../components/conditionalFieldsCustomInputComponent'

export default {
  title: 'Asset',
  name: 'asset',
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
