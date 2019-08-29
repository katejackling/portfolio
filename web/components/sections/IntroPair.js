import Link from "next/link";
import Media from "../../components/Media";

function IntroPair(props) {
	const { layout, reference, media_left, media_right } = props,
		prio = layout === "Large & Small" ? 2 : 1,
		asset_left =
			media_left.type === "video" ? media_left.video.mux.asset : media_left.image.asset,
		type_left = media_left.type,
		asset_right =
			media_right.type === "video" ? media_right.video.mux.asset : media_right.image.asset,
		type_right = media_right.type;

	console.log(props);

	return (
		<section className="intro__section intro__section--pair">
			<figure>
				<Media asset={asset_left} type={type_left} />
				<figcaption>{reference[0] && reference[0].title}</figcaption>
			</figure>
			<figure>
				<Media asset={asset_right} type={type_right} />
				<figcaption>{reference[1] && reference[1].title}</figcaption>
			</figure>
			<style jsx global>{`
				@media screen and (min-width: 640px) {
					.intro__section.intro__section--pair {
						display: flex;
						justify-content: space-between;
						flex-wrap: nowrap;
						padding: 0 calc(var(--marginOuter) / 2);
					}

					.intro__section.intro__section--pair figure {
						width: 50%;
						padding: 0 calc(var(--marginOuter) / 2 + 1rem + 1rem) 0
							calc(var(--marginOuter) / 2);
						background: red;
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
