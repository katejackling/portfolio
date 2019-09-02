import { capitalize } from "../scripts/utils";
import * as IntroSections from "./sections";

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
	const { content, references } = props;

	if (!content) {
		console.error("Missing section");
		return <div>Missing content</div>;
	}

	return (
		<article id="intro">
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
					padding: 0.5rem 0;
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
				}
			`}</style>
		</article>
	);
}

export default Intro;
