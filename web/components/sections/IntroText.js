import { useGlobal } from "reactn";

import { Link } from "react-scroll";

import Media from "../../components/Media";
import Block from "../../components/Block";

function IntroText(props) {
	const { reference = "", text } = props,
		content = reference.content,
		[headerSize, setHeaderHeight] = useGlobal("headerSize");

	let offsetHeader = headerSize && headerSize.height * -1;

	return (
		<section className="intro__section intro__section--text">
			<Link
				to={reference && reference._id}
				spy={true}
				smooth={true}
				duration={500}
				offset={offsetHeader}
			>
				<figure>
					<figcaption>
						<Block blocks={text} />
					</figcaption>
					<div className="wrapper__media--intro">
						{content.map(({ _type, media, media_left, media_right }, i) => {
							media = media ? media : media_left;

							return [
								media && (
									<Media
										key={i}
										type={media && media.type}
										asset={
											media && media.type === "video"
												? media.video.mux.asset
												: media.image.asset
										}
										gif={media && media.type === "video"}
									/>
								),
								media_right && (
									<Media
										key={i + "_right"}
										type={media_right && media_right.type}
										asset={
											media_right && media_right.type === "video"
												? media_right.video.mux.asset
												: media_right.image.asset
										}
										gif={media_right && media_right.type === "video"}
									/>
								)
							];
						})}
					</div>
				</figure>
			</Link>

			<style jsx global>{`
				.intro__section--text {
					padding: 0;
				}

				.intro__section--text:not(:first-child) {
					padding-top: var(--marginMedium);
				}

				.intro__section--text figcaption {
					width: 100%;
					font-size: calc(40px + (120 - 40) * (100vw - 360px) / (1920 - 360));
					line-height: calc(42px + (115 - 42) * (100vw - 360px) / (1920 - 360));
					padding: 0 var(--marginOuter);
				}

				.intro__section--text .wrapper__media--intro {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					padding: calc(var(--marginOuter) / 4 * 3);
					padding-top: 0;
				}

				.intro__section--text img,
				.intro__section--text video {
					width: auto;
					height: calc(
						(104px + (160 - 104) * (100vw - 360px) / (640 - 360)) + var(--marginOuter)
					);
					 {
						/* height: calc(10rem + var(--marginOuter)); */
					}
					padding: calc(var(--marginOuter) / 4);
				}

				@media screen and (max-width: 639px) {
					.intro__section--text {
						min-height: calc(100 * var(--vH));
					}
				}
				@media screen and (min-width: 640px) {
					.intro__section--text img,
					.intro__section--text video {
						height: calc(10rem + var(--marginOuter));
					}
				}
			`}</style>
		</section>
	);
}

export default IntroText;
