import { useGlobal } from "reactn";

import Media from "../../components/Media";
import { Link } from "react-scroll";

function IntroPair(props) {
	const { layout, reference, media_left, media_right } = props,
		prio = layout === "Large & Small" ? 2 : 1,
		asset_left =
			media_left.type === "video" ? media_left.video.mux.asset : media_left.image.asset,
		type_left = media_left.type,
		asset_right =
			media_right.type === "video" ? media_right.video.mux.asset : media_right.image.asset,
		type_right = media_right.type,
		[headerSize, setHeaderHeight] = useGlobal("headerSize");

	let offsetHeader = headerSize && headerSize.height * -1;

	return (
		<section className="intro__section intro__section--pair">
			<figure>
				<Link
					to={reference[0] && reference[0]._id}
					spy={true}
					smooth={true}
					duration={500}
					offset={offsetHeader}
				>
					<Media asset={asset_left} type={type_left} />
				</Link>
				<figcaption>
					<Link
						to={reference[0] && reference[0]._id}
						spy={true}
						smooth={true}
						duration={500}
						offset={offsetHeader}
					>
						{reference[0] && reference[0].title}
					</Link>
				</figcaption>
			</figure>

			<figure>
				<Link
					to={reference[1] && reference[1]._id}
					spy={true}
					smooth={true}
					duration={500}
					offset={offsetHeader}
				>
					<Media asset={asset_right} type={type_right} />
				</Link>
				<figcaption>
					<Link
						to={reference[1] && reference[1]._id}
						spy={true}
						smooth={true}
						duration={500}
						offset={offsetHeader}
					>
						{reference[1] && reference[1].title}
					</Link>
				</figcaption>
			</figure>

			<style jsx global>{`
				.intro__section--pair figcaption {
					padding-top: 0.2rem;
				}

				@media screen and (min-width: 640px) {
					.intro__section.intro__section--pair {
						display: flex;
						justify-content: space-between;
						flex-wrap: nowrap;
						padding: 0 calc(var(--marginOuter) / 2);
					}

					.intro__section.intro__section--pair figure {
						width: 50%;
						padding: 0 calc(var(--marginOuter) / 2 + 0.2rem + 1rem) 0
							calc(var(--marginOuter) / 2);
						align-self: flex-start;
					}
				}
			`}</style>
			<style jsx>{`
				@media screen and (max-width: 639px) {
					.intro__section.intro__section--pair figure:nth-child(${prio}) {
						padding: var(--marginOuter);
					}
				}

				@media screen and (min-width: 640px) {
					.intro__section.intro__section--pair figure:nth-child(${prio}) {
						width: 25%;
					}
				}
			`}</style>
		</section>
	);
}

export default IntroPair;
