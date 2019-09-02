import Media from "./Media";

function ProjectRowItem(props) {
	const { media, rowIndex, total } = props;

	return (
		<figure>
			<figcaption>
				{rowIndex}/{total}
			</figcaption>
			<Media
				type={media && media.type}
				asset={media && media.type === "video" ? media.video.mux.asset : media.image.asset}
				gif={media && media.type === "video"}
			/>
		</figure>
	);
}

export default ProjectRowItem;
