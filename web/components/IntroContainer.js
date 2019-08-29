import Link from "next/link";
import client from "../client";
import Intro from "./Intro";

class IntroContainer extends React.Component {
	//state = { content: [] };

	componentDidMount() {
		return client
			.fetch(
				`*[_id == "home"]{intro}[0]{intro, "references": intro[].reference->, "references_left": intro[].reference_left->, "references_right": intro[].reference_right->}`
			)
			.then(query => {
				const { intro, references, references_left, references_right } = query;
				this.setState({
					content: intro,
					references: { references, references_left, references_right }
				});
			});
	}

	render() {
		if (!this.state) {
			return null;
		}
		return <Intro content={this.state.content} references={this.state.references} />;
	}
}

export default IntroContainer;
