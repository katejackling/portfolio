import { useGlobal, useRef, useEffect } from "reactn";
import { useInView } from "react-intersection-observer";
import Block from "../components/Block";

function About(props) {
	const { content } = props,
		[ref, inView, entry] = useInView({
			/* Optional options */
			rootMargin: "-50%"
		}),
		[sectionActive, setSection] = useGlobal("sectionActive");

	useEffect(() => {
		if (inView && sectionActive !== "info") {
			setSection("info");
		}
		return undefined;
	}, [inView]);

	return (
		<article ref={ref} id="info" className="info">
			<section className="about">
				<Block blocks={content.about} />
			</section>
			<section className="clients">
				<h3>Clients</h3>
				<Block blocks={content.clients} />
			</section>
			<section className="editorial">
				<h3>Editorial</h3>
				<Block blocks={content.editorial} />
			</section>
			<section className="colophon">
				<footer>
					Design by Daily Dialogue
					<br />
					Development by Philipp Polder
				</footer>
				<h3>Legal Notice</h3>
				{/* <Block blocks={content.legal_notice} /> */}
			</section>
			<style jsx global>{`
				#info p:not(:last-child) {
					margin-bottom: 1.25em;
				}

				.info {
					display: flex;
					flex-wrap: wrap;
					padding: calc(var(--marginOuter) / 2);
				}

				.info h3 {
					text-transform: uppercase;
				}

				.info > * {
					padding: calc(var(--marginOuter) / 2);
				}
				.info > *:not(:last-child) {
					margin-bottom: var(--marginMedium);
				}

				.colophon {
					width: 100%;
				}

				@media screen and (max-width: 1279px) {
					.about {
						width: 100%;
					}

					.editorial,
					.clients {
						width: 50%;
					}
				}

				@media screen and (min-width: 1280px) {
					.info {
						min-height: calc(100 * var(--vH) - var(--headerH));
						align-content: space-between;
					}
					.about {
						width: auto;
					}

					.editorial,
					.clients {
						width: auto;
						margin-left: calc(6rem - var(--marginOuter));
					}
				}
			`}</style>
		</article>
	);
}

export default About;
