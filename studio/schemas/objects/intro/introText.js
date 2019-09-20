import { MdStar } from 'react-icons/lib/md'
import React from 'react'

export default {
	name: 'introText',
	type: 'object',
	title: 'Text with Thumbnails',
	icon: MdStar,
	fields: [
		{
			type: 'reference',
			name: 'reference',
			to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
		},
		{
			name: 'text',
			type: 'portableText',
			title: 'Text'
		},
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [{ type: 'media' }],
			options: { layout: 'grid' }
		}
	],
	preview: {
		select: {
			title: 'reference.title',
			media: 'reference.content.0.media',
			playbackId: 'reference.content.0.media.video.mux.asset.playbackId',
			imageURL: 'reference.content.0.media.image.asset.url'
		},
		prepare(selection) {
			const { title, media, playbackId, imageURL } = selection
			let mediaPreview
			if (media && media.type === 'video') {
				let url = `https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=200&height=200&fit_mode=pad&time=0`
				console.log(url)
				mediaPreview = <img src={url} />
			} else {
				let url = `${imageURL}?w=200&h=200&fit=crop`
				mediaPreview = <img src={url} />
			}
			return {
				title: title,
				subtitle: 'Text with Thumbnails',
				media: mediaPreview
			}
		}
	}
}
