import Media from "../../components/Media";

function ViewerPair(props) {
	const { media_left, media_right } = props,
		asset_left =
			media_left.type === "video" ? media_left.video.mux.asset : media_left.image.asset,
		type_left = media_left.type,
		asset_right =
			media_right.type === "video" ? media_right.video.mux.asset : media_right.image.asset,
		type_right = media_right.type;
	return (
		<figure className="pair">
			<Media media={media_left} asset={asset_left} type={type_left} />
			<Media media={media_right} asset={asset_right} type={type_right} />
		</figure>
	);
}

export default ViewerPair;
