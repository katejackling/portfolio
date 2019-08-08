import S from '@sanity/desk-tool/structure-builder'
import { MdDashboard, MdSettings, MdSentimentSatisfied, MdStar } from 'react-icons/lib/md'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['page', 'route', 'site-config', 'about', 'intro'].includes(listItem.getId())

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
        .title('Intro')
        .icon(MdStar)
        .child(
          S.editor()
            .id('intro')
            .schemaType('intro')
            .documentId('intro')
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
        .title('Pages')
        .icon(MdDashboard)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Routes')
        .schemaType('route')
        .child(S.documentTypeList('route').title('Routes')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
