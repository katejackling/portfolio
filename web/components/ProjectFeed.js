import client from "../client";
import Link from "next/link";
import { useGlobal, useRef, useEffect } from "reactn";
import { useInView } from "react-intersection-observer";

import ProjectRowContainer from "./ProjectRowContainer";
import ProjectGridContainer from "./ProjectGridContainer";

function ProjectFeed(props) {
	const { posts, title = "", type = "" } = props,
		[ref, inView, entry] = useInView({
			/* Optional options */
			rootMargin: "-50%"
		}),
		[sectionActive, setSection] = useGlobal("sectionActive");

	useEffect(() => {
		if (inView && sectionActive !== type) {
			setSection(type);
		}
		return undefined;
	}, [inView]);

	return (
		<article ref={ref} id={type} className={type !== "film" ? "projects row" : "projects grid"}>
			<h2>{title}</h2>
			<ul>
				{posts.map(({ _id, title = "", slug = "", content = [], mediaFeatured }) => {
					let total = 0;

					content.forEach(slide => {
						total = total + (slide.hasOwnProperty("media_right") ? 2 : 1);
					});

					return (
						slug && (
							<li key={_id} className="project" id={_id}>
								<h3>{title}</h3>
								{type !== "film" ? (
									<ProjectRowContainer content={content} id={_id} total={total} />
								) : (
									<ProjectGridContainer
										mediaFeatured={mediaFeatured}
										content={content}
										id={_id}
										total={total}
									/>
								)}
							</li>
						)
					);
				})}
			</ul>
			<style jsx global>{`
				.projects:not(:last-child) {
					padding-bottom: 15rem;
				}
				.project:not(:last-child) {
					margin-bottom: var(--marginMedium);
				}
				.projects h2 {
					padding: 0 var(--marginOuter);
					text-transform: uppercase;
				}

				.row h3 {
					padding: 0 var(--marginOuter);
				}

				.grid {
					width: 100%;
					user-select: none;
				}

				.grid h3 {
					margin-bottom: var(--marginOuter);
				}

				.grid ul {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: calc(var(--marginOuter) / 2);
				}

				.grid li {
					padding: calc(var(--marginOuter) / 2);
				}

				.grid li figure {
					position: relative;
					display: inline-block;
				}

				.grid video {
					cursor: pointer;
					-moz-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					user-select: none;
					-webkit-user-drag: none;
					user-drag: none;
					-webkit-touch-callout: none;
				}

				@media screen and (max-width: 639px) {
					.grid li,
					.grid figure,
					.grid video {
						width: 100%;
					}
				}

				@media screen and (min-width: 640px) {
					.projects h2 {
						width: 100%;
						text-align: center;
					}

					.grid li {
						width: 50%;
					}
					.grid video {
						width: calc(20rem * var(--ratio));
						max-width: calc((100vw - 3 * var(--marginOuter)) / 2);
					}
				}
			`}</style>
		</article>
	);
}

export default ProjectFeed;
