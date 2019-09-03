import React from 'react'

export default {
	name: 'viewerPair',
	type: 'object',
	title: 'Pair',
	fields: [
		{ title: 'Media', name: 'media_left', type: 'media' },
		{ title: 'Media', name: 'media_right', type: 'media' }
	],
	preview: {
		select: {
			media: 'media_left',
			playbackId: 'media_left.video.mux.asset.playbackId',
			imageURL: 'media_left.image.asset.url'
		},
		prepare(selection) {
			const { media, playbackId, imageURL } = selection
			let mediaPreview
			if (media && media.type === 'video') {
				let url = `https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=200&height=200&fit_mode=pad&time=0`
				mediaPreview = <img src={url} />
			} else {
				let url = `${imageURL}?w=200&h=200&fit=clip`
				mediaPreview = <img src={url} />
			}
			return {
				media: mediaPreview
			}
		}
	}
}
