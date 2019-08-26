import S from '@sanity/desk-tool/structure-builder'
import {
	MdDashboard,
	MdSettings,
	MdSentimentSatisfied,
	MdHome,
	MdFolderOpen
} from 'react-icons/lib/md'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
	!['page', 'route', 'site-config', 'about', 'home'].includes(listItem.getId())

export default () =>
	S.list()
		.title('Site')
		.items([
			S.listItem()
				.title('Site config')
				.icon(MdSettings)
				.child(
					S.editor()
						.id('config')
						.schemaType('site-config')
						.documentId('global-config')
				),
			S.listItem()
				.title('Home')
				.icon(MdHome)
				.child(
					S.editor()
						.id('home')
						.schemaType('home')
						.documentId('home')
				),
			S.listItem()
				.title('About')
				.icon(MdSentimentSatisfied)
				.child(
					S.editor()
						.id('about')
						.schemaType('about')
						.documentId('about')
				),
			S.listItem()
				.title('Stilllife')
				.icon(MdFolderOpen)
				.child(S.documentTypeList('stilllife').title('Stilllife')),
			S.listItem()
				.title('Commercial')
				.icon(MdFolderOpen)
				.child(S.documentTypeList('commercial').title('Commercial')),
			S.listItem()
				.title('Film')
				.icon(MdFolderOpen)
				.child(S.documentTypeList('film').title('Film'))
		])
