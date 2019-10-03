import React, { setGlobal } from "reactn";
import { useRouter } from "next/router";
import useClientFetch from "../utils/hooks/useClientFetch";

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
	console.log(router.query);
	const { id } = router.query;
	const data = useClientFetch(`*[slug.current == "${id}"][0]`);
	console.log(data);

	if (data) {
		const { _id, title, content } = data;

		setGlobal({
			navOpen: false,
			viewerTitle: title,
			viewerOpen: true,
			viewerContent: content,
			viewerID: _id,
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
	} else {
		return null;
	}
}

export default Index;

// componentDidMount() {
// 	require("../scripts/document.js");
// }
