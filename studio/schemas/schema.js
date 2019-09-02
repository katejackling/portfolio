// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import about from './documents/about'
import home from './documents/home'
import stilllife from './documents/stilllife'
import commercial from './documents/commercial'
import film from './documents/film'
import siteConfig from './documents/siteConfig'

// Object types
import media from './objects/media'
import figure from './objects/figure'
import internalLink from './objects/internalLink'
import link from './objects/link'
import portableText from './objects/portableText'
import video from './objects/video'

// Intro sections
import intro100 from './objects/intro/intro100'
import intro50 from './objects/intro/intro50'
import intro75 from './objects/intro/intro75'
import introPair from './objects/intro/introPair'
import introText from './objects/intro/introText'

// Viewer sections
import viewerContain from './objects/viewer/viewerSingleContain'
import viewerCover from './objects/viewer/viewerSingleCover'
import viewerPair from './objects/viewer/viewerPair'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	name: 'default',
	// Then proceed to concatenate our our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		about,
		film,
		commercial,
		figure,
		home,
		intro100,
		intro50,
		intro75,
		introPair,
		introText,
		internalLink,
		link,
		media,
		portableText,
		siteConfig,
		stilllife,
		video,
		viewerPair,
		viewerContain,
		viewerCover
	])
})
