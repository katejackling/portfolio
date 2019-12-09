import { setGlobal } from "reactn";
import Media from "../../components/Media";
import client from "../../client";
import Block from "../../components/Block";

function IntroText(props) {
	const { reference = "", text } = props,
		content = reference.content;

	const enableViewer = (viewerID, slideIndex, slug) => {
		history.pushState({}, "", "/post/" + slug);
		client.fetch(`*[_id == "${viewerID}"]`).then(res => {
			const { title, content, additional_info, year } = res[0];
			setGlobal({
				viewerTitle: title,
				viewerSubhead: additional_info,
				viewerYear: year,
				viewerOpen: true,
				viewerContent: content,
				viewerID,
				slideIndex
			});
		});
	};

	return (
		<section className="intro__section intro__section--text">
			<figure onClick={() => enableViewer(reference._id, 0, reference.slug.current)}>
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

			<style jsx global>{`
				.intro__section--text {
					padding: 0;
				}

				 {
					/* .intro__section--text:not(:first-child) {
					padding-top: var(--marginMedium);
				} */
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
					padding: 0 calc(var(--marginOuter) / 4 * 3);
					margin-bottom: calc(var(--marginOuter) / -4);
				}

				.intro__section--text img,
				.intro__section--text video {
					width: auto;
					height: calc(
						(104px + (160 - 104) * (100vw - 360px) / (640 - 360)) + var(--marginOuter)
					);
					padding: calc(var(--marginOuter) / 4);
				}

				 {
					/* @media screen and (max-width: 639px) {
					.intro__section--text {
						min-height: calc(100 * var(--vH));
					}
				} */
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
