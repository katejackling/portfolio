import client from "../client";
import ProjectFeed from "../components/ProjectFeed";

class ProjectFeedContainer extends React.Component {
  state = { posts: [] };

  componentDidMount() {
    return client.fetch(`*[_type == "${this.props.type}"]`).then(posts => {
      this.setState({ posts: posts });
    });
  }

  render() {
    return <ProjectFeed posts={this.state.posts} />;
  }
}

export default ProjectFeedContainer;
