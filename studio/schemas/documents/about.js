import { MdSentimentSatisfied } from 'react-icons/lib/md'

export default {
	name: 'about',
	type: 'document',
	title: 'About',
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
			name: 'about',
			type: 'portableText',
			title: 'About'
		},
		{
			name: 'editorial',
			type: 'portableText',
			title: 'Editorial'
		},
		{
			name: 'clients',
			type: 'portableText',
			title: 'Clients'
		},
		{
			name: 'legal',
			type: 'portableText',
			title: 'Legal'
		}
	],

	preview: {
		select: {
			title: 'title',
			media: 'openGraphImage'
		}
	}
}
