import React from 'react'

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
	],
	preview: {
		select: {
			title: 'title',
			playbackId: 'mediaFeatured.asset.playbackId'
		},
		prepare(selection) {
			const { title, playbackId } = selection
			let mediaPreview
			if (playbackId) {
				let url = `https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=200&height=200&fit_mode=pad&time=0`
				mediaPreview = <img src={url} />
			}
			return {
				title: title,
				media: mediaPreview
			}
		}
	}
}
