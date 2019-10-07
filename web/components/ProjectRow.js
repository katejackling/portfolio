import { setGlobal } from "reactn";
import client from "../client";
import ProjectRowItem from "../components/ProjectRowItem";

function ProjectRow(props) {
	const { content, id, total, clickEnabled, slug, additional_info, year } = props;

	const enableViewer = (viewerID, slideIndex, slug) => {
		history.pushState({}, "", "/" + slug);
		client.fetch(`*[_id == "${viewerID}"]`).then(res => {
			// console.log(res[0]);
			const title = res[0].title;
			const content = res[0].content;
			// console.log(viewerID, slideIndex, content);
			setGlobal({
				viewerTitle: title,
				viewerSubhead: additional_info,
				viewerYear: year,
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
					<React.Fragment key={rowIndex}>
						{(media_left || media) && (
							<li
								onMouseUp={() => {
									clickEnabled && enableViewer(id, i, slug);
								}}
							>
								<ProjectRowItem
									media={media ? media : media_left}
									rowIndex={rowIndex}
									total={total}
								/>
							</li>
						)}
						{media_right && rowIndex++ && (
							<li
								key={rowIndex + media_right}
								onMouseUp={() => {
									clickEnabled && enableViewer(id, i, slug);
								}}
							>
								<ProjectRowItem
									media={media_right}
									rowIndex={rowIndex}
									total={total}
								/>
							</li>
						)}
					</React.Fragment>
				);
			})}
		</ul>
	);
}

export default ProjectRow;
