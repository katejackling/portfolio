import { useGlobal } from "reactn";

import Media from "../../components/Media";
import { Link } from "react-scroll";

function Intro100(props) {
	const { media = "", reference = "" } = props;

	const asset = media.condition ? media.video.mux.asset : media.image.asset,
		type = media.condition ? "video" : "image",
		[headerSize, setHeaderHeight] = useGlobal("headerSize");

	let offsetHeader = headerSize && headerSize.height * -1;

	return (
		<section className="intro__section intro__section--100">
			<figure>
				<Link
					to={reference && reference._id}
					spy={true}
					smooth={true}
					duration={500}
					offset={offsetHeader}
				>
					<Media asset={asset} type={type} />
				</Link>
				<figcaption>{reference && reference.title}</figcaption>
			</figure>

			<style jsx global>{`
				.intro__section.intro__section--100 figcaption {
					color: white;
					mix-blend-mode: difference;
					padding: 0.35rem 0.5rem;
				}
			`}</style>
		</section>
	);
}

export default Intro100;
