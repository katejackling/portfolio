import client from "../client";
import Link from "next/link";
import Head from "next/head";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer";

import Header from "../components/Header";
import IntroContainer from "../components/IntroContainer";
import Projects from "../components/Projects";
import About from "../components/About";
import Footer from "../components/Footer";

import "../styles/main.css";

const middleware = [logger, thunk];

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middleware)));

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
				<Provider store={store}>
					<Header />
					<main>
						<IntroContainer />
						<Projects />
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
