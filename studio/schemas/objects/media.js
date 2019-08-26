import conditionalFields from '../../components/conditionalFieldsCustomInputComponent'

export default {
	title: 'Media',
	name: 'media',
	type: 'object',
	inputComponent: conditionalFields,
	fields: [
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [{ title: 'Image', value: 'image' }, { title: 'Video', value: 'video' }],
				layout: 'radio',
				direction: 'horizontal'
			},
			validation: Rule => Rule.required().error('Please select Media Type')
		},
		{
			name: 'video',
			type: 'video'
		},
		{
			name: 'image',
			type: 'figure'
		}
	]
}
