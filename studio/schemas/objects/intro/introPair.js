import { MdStar } from 'react-icons/lib/md'
import React from 'react'

export default {
	name: 'introPair',
	type: 'object',
	title: 'Pair',
	icon: MdStar,
	fields: [
		{
			title: 'Layout',
			name: 'layout',
			type: 'string',
			options: {
				list: ['Small & Large', 'Large & Small'],
				layout: 'dropdown'
			}
		},
		{
			type: 'reference',
			name: 'reference_left',
			to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
		},
		{ title: 'Media Left', name: 'media_left', type: 'media' },
		{
			type: 'reference',
			name: 'reference_right',
			to: [{ type: 'stilllife' }, { type: 'commercial' }, { type: 'film' }]
		},
		{ title: 'Media Right', name: 'media_right', type: 'media' }
	],
	preview: {
		select: {
			titleLeft: 'reference_left.title',
			titleRight: 'reference_right.title',
			media: 'media_left',
			playbackId: 'media_left.video.mux.asset.playbackId',
			imageURL: 'media_left.image.asset.url'
		},
		prepare(selection) {
			const { titleLeft, titleRight, media, playbackId, imageURL } = selection
			let mediaPreview
			if (media && media.type === 'video') {
				let url = `https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=200&height=200&fit_mode=pad&time=0`
				mediaPreview = <img src={url} />
			} else {
				let url = `${imageURL}?w=200&h=200&fit=crop`
				mediaPreview = <img src={url} />
			}
			return {
				title: `${titleLeft === titleRight ? titleLeft : titleLeft + ' & ' + titleRight}`,
				subtitle: 'Pair',
				media: mediaPreview
			}
		}
	}
}
