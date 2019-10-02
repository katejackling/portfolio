import { useGlobal } from "reactn";

import Media from "../../components/Media";
import { Link } from "react-scroll";

function Intro50(props) {
	const { media = "", reference = "", layout = "", text } = props;
	const asset = media.condition ? media.video.mux.asset : media.image.asset,
		type = media.condition ? "video" : "image",
		[headerSize, setHeaderHeight] = useGlobal("headerSize");

	let offsetHeader = headerSize && headerSize.height * -1;

	return (
		<section className="intro__section intro__section--50">
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
				.intro__section--50 {
					background: white;
				}

				.intro__section--50::after {
					content: ${text ? '"' + text + '"' : "none"};
					position: absolute;
					top: 50%;
					left: 50%;
					width: 100%;
					transform: translate(-50%, -50%);
					font-size: calc(48px + (180 - 60) * (100vw - 360px) / (1920 - 360));
					line-height: calc(52px + (155 - 60) * (100vw - 360px) / (1920 - 360));
					padding: var(--marginOuter);
					text-align: center;
					mix-blend-mode: difference;
					color: white;
					z-index: 7;
					pointer-events: none;
				}

				.intro__section--50 figcaption {
					padding-top: 0.2rem;
				}

				@media screen and (max-width: 639px) {
					.intro__section--50 {
						padding: var(--marginMedium);
						min-height: calc(100 * var(--vH));
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				@media screen and (min-width: 640px) {
					.intro__section.intro__section--50 {
						display: flex;
						flex-wrap: wrap;
						padding: 0 calc(var(--marginOuter) / 2);
					}

					.intro__section.intro__section--50 figure {
						width: 50%;
						padding: 0 calc(var(--marginOuter) / 2 + 0.2rem + 1rem) 0
							calc(var(--marginOuter) / 2);
					}
					.intro__section--50::after {
						padding: var(--marginMedium);
					}
				}
			`}</style>
			<style jsx>{`
				@media screen and (min-width: 640px) {
					.intro__section--50 {
						justify-content: ${layout === "left" ? "flex-start" : "flex-end"};
					}
				}
			`}</style>
		</section>
	);
}

export default Intro50;
