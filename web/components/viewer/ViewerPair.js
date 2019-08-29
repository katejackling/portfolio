import Media from "../../components/Media";

function ViewerPair(props) {
	console.log(props);
	const { media_left, media_right } = props,
		asset_left =
			media_left.type === "video" ? media_left.video.mux.asset : media_left.image.asset,
		type_left = media_left.type,
		asset_right =
			media_right.type === "video" ? media_right.video.mux.asset : media_right.image.asset,
		type_right = media_right.type;
	return (
		<figure className="pair">
			<Media asset={asset_left} type={type_left} />
			<Media asset={asset_right} type={type_right} />

			<style jsx global>{`
				figure.pair {
					display: flex;
					flex-wrap: nowrap;
					justify-content: center;
					padding: calc(var(--marginOuter) / 2);
				}
				figure.pair img,
				figure.pair video {
					width: 100%;
					height: 100%;
					object-fit: contain;
					padding: calc(var(--marginOuter) / 2);
				}
			`}</style>
		</figure>
	);
}

export default ViewerPair;
