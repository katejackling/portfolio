// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import page from './documents/page'
import about from './documents/about'
import intro from './documents/intro'
import stilllife from './documents/stilllife'
import commercial from './documents/commercial'
import film from './documents/film'
import route from './documents/route'
import siteConfig from './documents/siteConfig'

// Object types
import asset from './objects/asset'
import cta from './objects/cta'
import embedHTML from './objects/embedHTML'
import figure from './objects/figure'
import mux from './objects/mux'
import internalLink from './objects/internalLink'
import link from './objects/link'
import portableText from './objects/portableText'
import simplePortableText from './objects/simplePortableText'

// Intro sections
import intro100 from './objects/intro/intro100'
import intro50 from './objects/intro/intro50'
import intro75 from './objects/intro/intro75'
import introPair from './objects/intro/introPair'

// Viewer sections
import viewerSingle from './objects/viewer/viewerSingle'
import viewerPair from './objects/viewer/viewerPair'

// Landing page sections
import hero from './objects/hero'
import imageSection from './objects/imageSection'
import mailchimp from './objects/mailchimp'
import textSection from './objects/textSection'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    about,
    asset,
    cta,
    embedHTML,
    film,
    commercial,
    figure,
    hero,
    imageSection,
    intro,
    intro100,
    intro50,
    intro75,
    introPair,
    internalLink,
    link,
    mailchimp,
    mux,
    page,
    portableText,
    route,
    simplePortableText,
    siteConfig,
    stilllife,
    textSection,
    viewerPair,
    viewerSingle
  ])
})
