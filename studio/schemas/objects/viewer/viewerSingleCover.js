import React from 'react'

export default {
	name: 'viewerCover',
	type: 'object',
	title: 'Single Fullbleed',
	fields: [{ title: 'Media', name: 'media', type: 'media' }],
	preview: {
		select: {
			media: 'media',
			playbackId: 'media.video.mux.asset.playbackId',
			imageURL: 'media.image.asset.url'
		},
		prepare(selection) {
			const { media, playbackId, imageURL } = selection
			let mediaPreview
			if (media && media.type === 'video') {
				let url = `https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=200&height=200&fit_mode=pad&time=0`
				mediaPreview = <img src={url} />
			} else {
				let url = `${imageURL}?w=200&h=200&fit=crop`
				mediaPreview = <img src={url} />
			}
			return {
				media: mediaPreview
			}
		}
	}
}
