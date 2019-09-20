import { MdSentimentSatisfied } from 'react-icons/lib/md'

export default {
	name: 'test',
	type: 'document',
	title: 'About',
	icon: MdSentimentSatisfied,
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Site title'
		},
		{
			name: 'editorial',
			title: 'Editorial',
			type: 'array',
			of: [{ type: 'block' }]
		}
	]
}
