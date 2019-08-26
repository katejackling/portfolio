import client from "../client";
import ProjectFeed from "../components/ProjectFeed";
import { capitalize } from "../scripts/utils";

class ProjectFeedContainer extends React.Component {
	// state = { posts: [] };

	componentDidMount() {
		return client.fetch(`*[_type == "${this.props.type}"]`).then(posts => {
			this.setState({ posts: posts });
		});
	}

	render() {
		if (!this.state) {
			return null;
		}
		return (
			<ProjectFeed
				title={capitalize(this.props.type)}
				slug={this.props.type}
				posts={this.state.posts}
			/>
		);
	}
}

export default ProjectFeedContainer;
