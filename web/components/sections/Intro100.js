import Link from "next/link";
import Media from "../../components/Media";

function Intro100(props) {
	const { media = "", reference = "" } = props;
	console.log(media);

	const asset = media.condition ? media.video.mux.asset : media.image.asset,
		type = media.condition ? "video" : "image";

	return (
		<section className="intro__section intro__section--100">
			<figure>
				<Media asset={asset} type={type} />
				<figcaption>{reference && reference.title}</figcaption>
			</figure>
			<style jsx global>{`
				.intro__section.intro__section--100 figcaption {
					color: white;
					mix-blend-mode: difference;
					padding: 0.5rem;
				}
			`}</style>
		</section>
	);
}

export default Intro100;
