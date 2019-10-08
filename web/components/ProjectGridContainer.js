import { setGlobal } from "reactn";
import Media from "./Media";
import client from "../client";

function ProjectGridContainer(props) {
	const { mediaFeatured, id, slug, additional_info, year } = props;
	const enableViewer = (viewerID, slideIndex, slug) => {
		history.pushState({}, "", "/post/" + slug);

		client.fetch(`*[_id == "${viewerID}"]`).then(res => {
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
