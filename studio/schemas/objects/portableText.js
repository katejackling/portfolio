import React from 'react'

const ucRender = props => <span style={{ textTransform: 'uppercase' }}>{props.children}</span>

export default {
	title: 'Portable Text',
	name: 'portableText',
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [],
			marks: {
				decorators: [
					{ title: 'Emphasis', value: 'em' },
					{
						title: 'Uppercase',
						value: 'uppercase',
						blockEditor: {
							icon: () => '⬆️',
							render: ucRender
						}
					}
				],
				annotations: [{ type: 'link' }, { type: 'internalLink' }]
			}
		}
	]
}
