import Media from "../../components/Media";

function ViewerCover(props) {
	const { media = "", _type = "" } = props,
		asset = media.type === "video" ? media.video.mux.asset : media.image.asset,
		type = media.type,
		fit = _type.replace("viewer", "").toLowerCase();
	return (
		<figure className={fit}>
			<Media media={media} asset={asset} type={type} fit={fit} />
			<style jsx global>{`
				@media screen and (max-width: 639px) {
					figure.cover {
						display: flex;
						justify-content: center;
						align-content: center;
					}

					figure.cover img,
					figure.cover video {
						width: 100vmin;
						height: 100vmin;
						object-fit: contain;
					}
				}
				@media screen and (min-width: 640px) {
					figure.cover img,
					figure.cover video {
						object-fit: cover;
					}
				}
			`}</style>
		</figure>
	);
}

export default ViewerCover;
