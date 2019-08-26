export default {
	title: 'Video',
	name: 'video',
	type: 'object',
	hidden: true,
	fields: [
		{
			title: 'Show Controls?',
			name: 'videoControls',
			type: 'boolean'
		},
		{
			name: 'mux',
			title: 'Mux',
			type: 'mux.video'
		}
	]
}
