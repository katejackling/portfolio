import { useGlobal, useRef, useEffect, useState } from "reactn";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import useClientFetch from "../utils/hooks/useClientFetch";
import useDimensions from "../utils/hooks/useDimensions";
import Block from "../components/Block";

function About(props) {
	const { content } = props,
		[ref, inView, entry] = useInView({
			/* Optional options */
			rootMargin: "-50%"
		}),
		[sectionActive, setSection] = useGlobal("sectionActive"),
		[open, toggle] = useState(false),
		[contentRef, contentDimensions] = useDimensions(false),
		accordion = useSpring({ height: open ? contentDimensions.height : 0 }),
		[y, setY] = useSpring(() => ({ y: 0 }));

	const data = useClientFetch(`*[_id == "about"][0]`);

	useEffect(() => {
		if (inView && sectionActive !== "info") {
			setSection("info");
		}
		return undefined;
	}, [inView]);

	if (data) {
		return (
			<article ref={ref} id="info" className="info">
				<section className="about">
					<Block blocks={data.about} />
				</section>
				<section className="clients">
					<h3>Clients</h3>
					<Block blocks={data.clients} />
				</section>
				<section className="editorial">
					<h3>Editorial</h3>
					<Block blocks={data.editorial} />
				</section>
				<section className="colophon">
					<footer>
						Design by Daily Dialogue
						<br />
						Development by Philipp Polder
					</footer>
					<br />
					<h3
						onClick={() => {
							toggle(!open);
							setY({
								y:
									contentDimensions.height > window.innerHeight / 2
										? window.scrollY + window.innerHeight / 2
										: window.scrollY + contentDimensions.height,
								reset: true,
								from: { y: window.scrollY },
								onFrame: props => window.scroll(0, props.y)
							});
						}}
					>
						{open ? "Close " : ""} Legal Notice
					</h3>
					<animated.div className="accordion" style={accordion}>
						<div ref={contentRef}>
							<Block blocks={data.legal_notice} />
						</div>
					</animated.div>
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

					.accordion {
						position: relative;
						width: 100%;
						heigth: auto;

						display: block;
						overflow: hidden;
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
	} else {
		return null;
	}
}

export default About;
