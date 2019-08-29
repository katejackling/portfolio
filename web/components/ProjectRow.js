import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { enableViewer } from "../utils/redux/actions";
import client from "../client";

import ProjectRowItem from "../components/ProjectRowItem";

function ProjectRow(props) {
	const { content, id, total, viewerOpen, enableViewer, slideIndex, clickEnabled } = props;
	let rowIndex = 0;
	return (
		<ul>
			{content.map(({ _type, media, media_left, media_right }, i) => {
				rowIndex++;
				return (
					<li
						key={rowIndex}
						onMouseUp={() => {
							clickEnabled && enableViewer(id, i);
						}}
					>
						{(media_left || media) && (
							<ProjectRowItem
								media={media ? media : media_left}
								rowIndex={rowIndex}
								total={total}
							/>
						)}
						{media_right && (
							<ProjectRowItem
								media={media_right}
								rowIndex={rowIndex + 1}
								total={total}
							/>
						)}
					</li>
				);
				media_right && rowIndex++;
			})}
		</ul>
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
)(ProjectRow);
