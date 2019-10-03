import { capitalize } from "../utils/scripts/helpers";
import * as IntroSections from "./sections";
import { useGlobal, useRef, useEffect } from "reactn";
import { useInView } from "react-intersection-observer";

function resolveSections(section) {
	// eslint-disable-next-line import/namespace
	const Section = IntroSections[capitalize(section._type)];

	if (Section) {
		return Section;
	}

	console.error("Cant find section", section); // eslint-disable-line no-console
	return null;
}

function Intro(props) {
	const { content, references } = props,
		[ref, inView, entry] = useInView({
			/* Optional options */
			rootMargin: "-50%"
		}),
		[sectionActive, setSection] = useGlobal("sectionActive");

	useEffect(() => {
		if (inView && sectionActive !== false) {
			setSection(false);
		}
		return undefined;
	}, [inView]);

	if (!content) {
		console.error("Missing section");
		return <div>Missing content</div>;
	}

	return (
		<article ref={ref} id="intro">
			{content.map((section, i) => {
				const IntroSection = resolveSections(section);
				if (!IntroSection) {
					return <div>Missing section {section._type}</div>;
				}
				const ref =
					section._type === "introPair"
						? [references.references_left[i], references.references_right[i]]
						: references.references[i];
				return <IntroSection {...section} reference={ref} key={section._key + i} />;
			})}
			<style jsx global>{`
				#intro {
					margin-bottom: var(--marginMedium);
				}

				.intro__section,
				.intro__section figure {
					position: relative;
					width: 100%;
				}
				.intro__section:not(.intro__section--text) figcaption {
					position: absolute;
					top: 0;
					left: 100%;
					white-space: nowrap;
					transform: rotate(-90deg) translate(-100%, -100%);
					transform-origin: top left;
				}

				body:not(.is--touch)
					#intro
					.intro__section:not(.intro__section--text)
					figure:hover
					img,
				body:not(.is--touch) #intro .intro__section.intro__section--text img:hover,
				body:not(.is--touch)
					#intro
					.intro__section:not(.intro__section--text)
					figure:hover
					video,
				body:not(.is--touch) #intro .intro__section.intro__section--text video:hover {
					cursor: pointer;
					filter: grayscale(1) invert(1);
				}

				@media screen and (max-width: 639px) {
					.intro__section:not(.intro__section--text) figcaption {
						display: none;
					}
				}

				@media screen and (min-width: 640px) {
					#intro,
					.intro__section:not(:last-child) {
						margin-bottom: 15rem;
					}

					 {
						/* html:not(.is--touch).intro__section:not(.intro__section--text)
						figure:not(:hover)
						figcaption {
						display: none;
					} */
					}
				}
			`}</style>
		</article>
	);
}

export default Intro;
