import { setGlobal } from "reactn";
import client from "../client";
import ProjectRowItem from "../components/ProjectRowItem";

function ProjectRow(props) {
	const { content, id, total, clickEnabled } = props;

	const enableViewer = (viewerID, slideIndex) => {
		client.fetch(`*[_id == "${viewerID}"]`).then(res => {
			const content = res[0].content;
			console.log(viewerID, slideIndex, content);
			setGlobal({
				viewerOpen: true,
				viewerContent: content,
				viewerID,
				slideIndex
			});
		});
	};

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
						{media_right && rowIndex++ && (
							<ProjectRowItem media={media_right} rowIndex={rowIndex} total={total} />
						)}
					</li>
				);
			})}
		</ul>
	);
}

export default ProjectRow;
