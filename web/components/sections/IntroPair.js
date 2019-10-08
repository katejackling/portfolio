import { setGlobal } from "reactn";
import Parser from "html-react-parser";
import Media from "../../components/Media";
import client from "../../client";

function IntroPair(props) {
	const { layout, reference, media_left, media_right } = props,
		prio = layout === "Large & Small" ? 2 : 1,
		asset_left =
			media_left.type === "video" ? media_left.video.mux.asset : media_left.image.asset,
		type_left = media_left.type,
		asset_right =
			media_right.type === "video" ? media_right.video.mux.asset : media_right.image.asset,
		type_right = media_right.type;

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
		<section className="intro__section intro__section--pair">
			<figure onClick={() => enableViewer(reference[0]._id, 0, reference[0].slug.current)}>
				<Media asset={asset_left} type={type_left} />

				<figcaption>
					<span className="title">{reference[0] && reference[0].title.trim()}</span>
					{reference[0].additional_info
						? Parser(`, <em>${reference[0].additional_info.trim()}</em>`)
						: ""}
					{reference[0].year ? `, ${reference[0].year}` : ""}
				</figcaption>
			</figure>

			<figure onClick={() => enableViewer(reference[1]._id, 0, reference[1].slug.current)}>
				<Media asset={asset_right} type={type_right} />

				<figcaption>
					<span className="title">{reference[1] && reference[1].title.trim()}</span>
					{reference[1].additional_info
						? Parser(`, <em>${reference[1].additional_info.trim()}</em>`)
						: ""}
					{reference[1].year ? `, ${reference[1].year}` : ""}
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
