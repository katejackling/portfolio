import React, { setGlobal } from "reactn";

import client from "../client";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/Header";
import IntroContainer from "../components/IntroContainer";
import Projects from "../components/Projects";
import About from "../components/About";
import Footer from "../components/Footer";

import addReactNDevTools from "reactn-devtools";

addReactNDevTools();

import "../styles/main.css";

setGlobal({
	navOpen: false,
	viewerOpen: false,
	viewerContent: null,
	viewerID: null,
	slideIndex: 0,
	headerHeight: 0
});

class Index extends React.Component {
	render() {
		const { about } = this.props;

		return (
			<>
				<Head>
					<title>My page title</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
						key="viewport"
					/>
				</Head>

				<Header />
				<main>
					<IntroContainer />
					<Projects />
					<About content={about} />
					<Footer />
				</main>
			</>
		);
	}

	componentDidMount() {
		require("../scripts/document.js");
	}
}

export default Index;

Index.getInitialProps = async () => ({
	about: await client.fetch(`*[_id == "about"][0]`)
});
