export default {
	title: 'Stilllife',
	name: 'stilllife',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			}
		},
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [{ type: 'viewerContain' }, { type: 'viewerCover' }, { type: 'viewerPair' }],
			options: { layout: 'grid' }
		}
	]
}
