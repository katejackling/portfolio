import React from 'react'

export default {
	name: 'viewerContain',
	type: 'object',
	title: 'Single Contain',
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
				let url = `https://image.mux.com/${playbackId}/thumbnail.png?width=200&height=200&fit_mode=pad&time=0`
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
