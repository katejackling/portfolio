import client from "../client";
import Link from "next/link";
import Head from "next/head";

import { Provider } from "../components/Context";

import Test from "../components/Test";

import Header from "../components/Header";
import Intro from "../components/Intro";
import ProjectFeedContainer from "../components/ProjectFeedContainer";
import About from "../components/About";
import Footer from "../components/Footer";

import "../styles/main.css";

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
				<Provider>
					<Header />
					<main>
						<Intro />
						<ProjectFeedContainer type="stilllife" />
						<ProjectFeedContainer type="commercial" />
						<ProjectFeedContainer type="film" />
						<About content={about} />
						<Footer />
					</main>
				</Provider>
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
