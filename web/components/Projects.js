import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProjectFeedContainer from "../components/ProjectFeedContainer";
import ProjectViewerContainer from "../components/ProjectViewerContainer";

function Projects(props) {
	const { viewerOpen, viewerContent } = props;
	console.log(viewerContent);
	return (
		<>
			<ProjectFeedContainer type="stilllife" />
			<ProjectFeedContainer type="commercial" />
			<ProjectFeedContainer type="film" />
			{viewerOpen && <ProjectViewerContainer />}
		</>
	);
}

const mapStateToProps = state => ({
	viewerOpen: state.viewer.viewerOpen,
	viewerContent: state.viewer.viewerContent,
	viewerID: state.viewer.viewerID,
	slideIndex: state.viewer.slideIndex
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Projects);
