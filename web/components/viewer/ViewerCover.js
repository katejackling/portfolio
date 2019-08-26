import Media from "../../components/Media";

function ViewerCover(props) {
	const { media = "", _type = "" } = props,
		asset = media.type === "video" ? media.video.mux.asset : media.image.asset,
		type = media.type,
		fit = _type.replace("viewer", "").toLowerCase();
	return (
		<figure className={fit}>
			<Media asset={asset} type={type} fit={fit} />
			<style jsx>{`
				:global(figure.cover img, figure.cover video) {
					object-fit: cover;
				}
				@media screen and (min-width: 640px) {
				}
			`}</style>
		</figure>
	);
}

export default ViewerCover;
