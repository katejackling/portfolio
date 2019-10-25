import { setGlobal } from "reactn";
import Parser from "html-react-parser";
import Media from "../../components/Media";
import client from "../../client";

function Intro75(props) {
	const { media = "", reference = "", layout = "" } = props;

	const type = media.type;

	if (!type) {
		return null;
	}

	const asset = type && type === "video" ? media[type].mux.asset : media[type].asset;

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
		<section className="intro__section intro__section--75">
			<figure onClick={() => enableViewer(reference._id, 0, reference.slug.current)}>
				<Media asset={asset} type={type} />

				<figcaption>
					<span className="title">{reference && reference.title.trim()}</span>
					{reference.additional_info
						? Parser(`, <em>${reference.additional_info.trim()}</em>`)
						: ""}
					{reference.year ? `, ${reference.year}` : ""}
				</figcaption>
			</figure>

			<style jsx global>{`
				.intro__section--75 figcaption {
					padding-top: 0.2rem;
				}

				@media screen and (min-width: 640px) {
					.intro__section.intro__section--75 {
						display: flex;
						padding: 0 calc(var(--marginOuter) / 2);
					}

					.intro__section.intro__section--75 figure {
						width: 75%;
						padding: 0 calc(var(--marginOuter) / 2 + 0.2rem + 1rem) 0
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
