import { setGlobal } from "reactn";
import Media from "./Media";
import client from "../client";

function ProjectGridContainer(props) {
	const { mediaFeatured, id, slug } = props;
	const enableViewer = (viewerID, slideIndex, slug) => {
		history.pushState({}, "", "/" + slug);

		client.fetch(`*[_id == "${viewerID}"]`).then(res => {
			const content = res[0].content;
			// console.log(viewerID, slideIndex, content);
			setGlobal({
				viewerOpen: true,
				viewerContent: content,
				viewerID,
				slideIndex
			});
		});
	};
	return (
		<figure
			onClick={() => {
				enableViewer(id, 0, slug);
			}}
		>
			<Media type="video" asset={mediaFeatured.asset} gif={false} />
		</figure>
	);
}

export default ProjectGridContainer;
