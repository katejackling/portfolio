import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { enableViewer } from "../utils/redux/actions";

import Media from "./Media";

function ProjectGridContainer(props) {
	const { content, mediaFeatured, id, total, viewerOpen, enableViewer, slideIndex } = props;

	return (
		<figure
			onClick={() => {
				enableViewer(id, 0);
			}}
		>
			<Media type="video" asset={mediaFeatured.asset} gif={false} />
		</figure>
	);
}

const mapStateToProps = state => ({
	viewerOpen: state.viewer.viewerOpen,
	viewerID: state.viewer.viewerID,
	slideIndex: state.viewer.slideIndex
});

const mapDispatchToProps = dispatch => bindActionCreators({ enableViewer }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectGridContainer);
