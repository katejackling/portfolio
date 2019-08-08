import client from "../client";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/Header";
import Intro from "../components/Intro";
import ProjectFeedContainer from "../components/ProjectFeedContainer";
import About from "../components/About";

function Index(props) {
	const { about } = props;
	console.log(about);
	return (
		<>
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
			</Head>
			<Header />
			<main>
				<Intro />
				<ProjectFeedContainer type="stilllife" />
				<ProjectFeedContainer type="commercial" />
				<ProjectFeedContainer type="film" />
				<About content={about[0]} />
			</main>
		</>
	);
}

export default Index;

Index.getInitialProps = async () => ({
	about: await client.fetch(`*[_id == "about"]`)
});

// export default class MyDocument extends Document {
//   static async getInitialProps (ctx) {
//     const initialProps = await Document.getInitialProps(ctx)
//     return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then(lang => {
//       return {...initialProps, lang}
//     })
//   }

//   render () {
//     return (
//       <Html lang={this.props.lang || 'en'}>
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
