export default {
	title: 'Film',
	name: 'film',
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
		{ title: 'Featured Media', name: 'mediaFeatured', type: 'mux.video' },
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [{ type: 'viewerContain' }, { type: 'viewerCover' }, { type: 'viewerPair' }],
			options: { layout: 'grid' }
		}
	]
}
