import React from 'react'
import conditionalFields from '../../components/conditionalFieldsCustomInputComponent'

export default {
	title: 'Media',
	name: 'media',
	type: 'object',
	inputComponent: conditionalFields,
	fields: [
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [{ title: 'Image', value: 'image' }, { title: 'Video', value: 'video' }],
				layout: 'radio',
				direction: 'horizontal'
			},
			validation: Rule => Rule.required().error('Please select Media Type')
		},
		{
			name: 'video',
			type: 'video'
		},
		{
			name: 'image',
			type: 'figure'
		}
	],
	preview: {
		select: {
			type: 'type',
			playbackId: 'video.mux.asset.playbackId',
			imageURL: 'image.asset.url'
		},
		prepare(selection) {
			const { type, playbackId, imageURL } = selection
			let mediaPreview
			if (type === 'video') {
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
