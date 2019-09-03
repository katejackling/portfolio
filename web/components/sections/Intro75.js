import { useGlobal } from "reactn";

import Media from "../../components/Media";
import { Link } from "react-scroll";

function Intro75(props) {
	const { media = "", reference = "", layout = "" } = props;
	const asset = media.condition ? media.video.mux.asset : media.image.asset,
		type = media.condition ? "video" : "image",
		[headerSize, setHeaderHeight] = useGlobal("headerSize");

	let offsetHeader = headerSize && headerSize.height * -1;

	return (
		<section className="intro__section intro__section--75">
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
				<figcaption>
					<Link
						to={reference && reference._id}
						spy={true}
						smooth={true}
						duration={500}
						offset={offsetHeader}
					>
						{reference && reference.title}
					</Link>
				</figcaption>
			</figure>

			<style jsx global>{`
				@media screen and (min-width: 640px) {
					.intro__section.intro__section--75 {
						display: flex;
						padding: 0 calc(var(--marginOuter) / 2);
					}

					.intro__section.intro__section--75 figure {
						width: 75%;
						padding: 0 calc(var(--marginOuter) / 2 + 1rem + 1rem) 0
							calc(var(--marginOuter) / 2);
					}
				}
			`}</style>
			<style jsx>{`
				@media screen and (min-width: 640px) {
					.intro__section--75 {
						justify-content: ${layout === "left" ? "flex-start" : "flex-end"};
					}
				}
			`}</style>
		</section>
	);
}
export default Intro75;
