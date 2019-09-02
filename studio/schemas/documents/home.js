export default {
	name: 'home',
	type: 'document',
	title: 'Home',
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
			title: 'Intro',
			name: 'intro',
			type: 'array',
			of: [
				{ type: 'intro100' },
				{ type: 'intro75' },
				{ type: 'intro50' },
				{ type: 'introPair' },
				{ type: 'introText' }
			]
			// options: {
			// 	editModal: 'fullscreen'
			// }
		},
		{
			title: 'Stilllife',
			name: 'stilllife',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'stilllife' }]
				}
			]
		},
		{
			title: 'Commercial',
			name: 'commercial',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'commercial' }]
				}
			]
		},
		{
			title: 'Film',
			name: 'film',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'film' }]
				}
			]
		}
	],

	preview: {
		select: {
			title: 'title',
			media: 'openGraphImage'
		}
	}
}
