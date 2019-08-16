export default {
	title: 'Portable Text',
	name: 'portableText',
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [],
			marks: {
				decorators: [{ title: 'Emphasis', value: 'em' }],
				annotations: [{ type: 'link' }, { type: 'internalLink' }]
			}
		}
	]
}
