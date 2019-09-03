import React from 'react'

export default {
	title: 'Commercial',
	name: 'commercial',
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
	],
	preview: {
		select: {
			title: 'title',
			media: 'content.0.media',
			playbackId: 'content.0.media.video.mux.asset.playbackId',
			imageURL: 'content.0.media.image.asset.url'
		},
		prepare(selection) {
			const { title, media, playbackId, imageURL } = selection
			let mediaPreview
			if (media && media.type === 'video') {
				let url = `https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=200&height=200&fit_mode=pad&time=0`
				mediaPreview = <img src={url} />
			} else {
				let url = `${imageURL}?w=200&h=200&fit=crop`
				mediaPreview = <img src={url} />
			}
			return {
				title: title,
				media: mediaPreview
			}
		}
	}
}
