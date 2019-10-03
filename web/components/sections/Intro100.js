import { setGlobal } from "reactn";
import Parser from "html-react-parser";
import Media from "../../components/Media";
import client from "../../client";

function Intro100(props) {
	const { media = "", reference = "" } = props;

	const asset = media.condition ? media.video.mux.asset : media.image.asset,
		type = media.condition ? "video" : "image";

	const enableViewer = (viewerID, slideIndex, slug) => {
		history.pushState({}, "", "/" + slug);
		client.fetch(`*[_id == "${viewerID}"]`).then(res => {
			const title = res[0].title;
			const content = res[0].content;
			setGlobal({
				viewerTitle: title,
				viewerOpen: true,
				viewerContent: content,
				viewerID,
				slideIndex
			});
		});
	};

	return (
		<section className="intro__section intro__section--100">
			<figure onClick={() => enableViewer(reference._id, 0, reference.slug.current)}>
				<Media asset={asset} type={type} />

				<figcaption>
					<span className="title">{reference && reference.title}</span>
					{reference.additional_info
						? Parser(`, <em>${reference.additional_info}</em>`)
						: ""}
					{reference.year ? `, ${reference.year}` : ""}
				</figcaption>
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
