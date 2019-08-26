import { MdStar } from 'react-icons/lib/md'
import React from 'react'

export default {
	name: 'intro100',
	type: 'object',
	title: 'Full Width',
	icon: MdStar,
	fields: [
		{
			type: 'reference',
			name: 'reference',
			to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
		},
		{ title: 'Media', name: 'media', type: 'media' }
	],
	preview: {
		select: {
			title: 'reference.title',
			media: 'media',
			playbackId: 'media.video.mux.asset.playbackId',
			imageURL: 'media.image.asset.url'
		},
		prepare(selection) {
			const { title, media, playbackId, imageURL } = selection
			let mediaPreview
			if (media && media.type === 'video') {
				let url = `https://image.mux.com/${playbackId}/thumbnail.png?width=200&height=200&fit_mode=pad&time=0`
				mediaPreview = <img src={url} />
			} else {
				let url = `${imageURL}?w=200&h=200&fit=crop`
				mediaPreview = <img src={url} />
			}
			return {
				title: title,
				subtitle: 'Full Width',
				media: mediaPreview
			}
		}
	}
}
