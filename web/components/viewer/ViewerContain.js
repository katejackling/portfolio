import Media from "../../components/Media";

function ViewerContain(props) {
	const { media = "", _type = "" } = props,
		asset = media.type === "video" ? media.video.mux.asset : media.image.asset,
		type = media.type,
		fit = _type.replace("viewer", "").toLowerCase();

	return (
		<figure className={fit}>
			<Media media={media} asset={asset} type={type} fit={fit} />
			<style jsx>{`
				:global(figure.contain img, figure.contain video) {
					object-fit: contain;
				}
			`}</style>
		</figure>
	);
}

export default ViewerContain;
