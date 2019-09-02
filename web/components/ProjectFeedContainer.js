import client from "../client";
import ProjectFeed from "../components/ProjectFeed";
import { capitalize } from "../scripts/utils";

class ProjectFeedContainer extends React.Component {
	state = { posts: [] };

	componentDidMount() {
		const type = this.props.type;
		return client.fetch(`*[_type=="home"][0]{${type}[]->}`).then(posts => {
			this.setState({
				posts: posts[type]
			});
		});
	}

	render() {
		if (!this.state) {
			return null;
		}
		return (
			<ProjectFeed
				title={capitalize(this.props.type)}
				type={this.props.type}
				posts={this.state.posts}
			/>
		);
	}
}

export default ProjectFeedContainer;
