import bcp47 from 'bcp47'

export default {
	name: 'site-config',
	type: 'document',
	title: 'Site configuration',
	// https://www.sanity.io/docs/experimental/ui-affordances-for-actions
	__experimental_actions: [/* create, delete, */ 'update', 'publish'],
	fieldsets: [{ name: 'footer', title: 'Footer' }],
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Site title'
		},
		{
			title: 'Site language',
			description: 'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
			name: 'lang',
			type: 'string',
			validation: Rule =>
				Rule.custom(lang => (bcp47.parse(lang) ? true : 'Please use a valid bcp47 code'))
		},
		{
			name: 'description',
			type: 'text',
			title: 'Description',
			validation: Rule => [
				Rule.required()
					.max(160)
					.warning('The meta description should not exceed 160 characters')
			]
		},
		{
			title: 'Open Graph Images',
			name: 'ogImages',
			description: 'Add one or more images to represent the website',
			type: 'array',
			of: [{ type: 'figure' }],
			options: { layout: 'grid' }
		}
	]
}
