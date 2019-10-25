import React, { setGlobal } from "reactn";
import { useRouter } from "next/router";

import client from "../client";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/Header";
import IntroContainer from "../components/IntroContainer";
import Projects from "../components/Projects";
import About from "../components/About";
import Footer from "../components/Footer";

import addReactNDevTools from "reactn-devtools";

import "../styles/main.css";

addReactNDevTools();

function Index(props) {
	const router = useRouter();
	// console.log(router.query);
	const { id } = router.query;

	if (process.browser) {
		require("../utils/scripts/init");
	}

	setGlobal({
		navOpen: false,
		viewerTitle: false,
		viewerSubhead: false,
		viewerYear: false,
		viewerOpen: false,
		viewerContent: null,
		viewerID: null,
		slideIndex: 0,
		headerHeight: 0,
		sectionActive: false,
		mediaHover: false
	});

	return (
		<>
			<Head>
				<title>Kate Jackling</title>
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
				<About />
				<Footer />
			</main>
		</>
	);
}

export default Index;

// componentDidMount() {
// 	require("../scripts/document.js");
// }
