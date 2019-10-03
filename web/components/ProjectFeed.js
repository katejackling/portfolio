import client from "../client";
import Link from "next/link";
import { useGlobal, useRef, useEffect } from "reactn";
import { useInView } from "react-intersection-observer";
import Parser from "html-react-parser";

import ProjectRowContainer from "./ProjectRowContainer";
import ProjectGridContainer from "./ProjectGridContainer";

function ProjectFeed(props) {
	const { posts, title = "", type = "" } = props,
		[ref, inView, entry] = useInView({
			rootMargin: "-50%"
		}),
		[sectionActive, setSection] = useGlobal("sectionActive"),
		[mediaHover, setMediaHover] = useGlobal("mediaHover");

	useEffect(() => {
		if (inView && sectionActive !== type) {
			setSection(type);
		}
		return undefined;
	}, [inView]);

	return (
		<article ref={ref} id={type} className={type !== "film" ? "projects row" : "projects grid"}>
			<ul>
				{posts.map(
					({
						_id,
						title = "",
						slug = "",
						additional_info,
						year,
						content = [],
						mediaFeatured
					}) => {
						let total = 0;

						content.forEach(slide => {
							total = total + (slide.hasOwnProperty("media_right") ? 2 : 1);
						});
						// console.log(slug);

						return (
							slug && (
								<li key={_id} className="project" id={_id}>
									<h3>
										<span className="title">{title}</span>
										{additional_info
											? Parser(`, <em>${additional_info}</em>`)
											: ""}
										{year ? `, ${year}` : ""}
									</h3>
									{type !== "film" ? (
										<ProjectRowContainer
											content={content}
											id={_id}
											total={total}
											slug={slug.current}
										/>
									) : (
										<ProjectGridContainer
											mediaFeatured={mediaFeatured}
											content={content}
											id={_id}
											total={total}
											slug={slug.current}
										/>
									)}
								</li>
							)
						);
					}
				)}
			</ul>
			<style jsx global>{`
				.title {
					text-transform: uppercase;
				}

				.projects:not(:last-child) {
					padding-bottom: 15rem;
				}
				.project:not(:last-child) {
					margin-bottom: calc(
						16px * 2 + (16 * 3 - 16 * 2) * (100vw - 360px) / (1440 - 360)
					);
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

				.grid img.lazyloaded,
				.grid video {
					transition: 0.5s;
				}

				body:not(.is--touch) .grid ul:hover li:not(:hover) img,
				body:not(.is--touch) .grid ul:hover li:not(:hover) video {
					opacity: ${mediaHover ? 0.4 : 1};
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

					.grid h3 {
						margin-bottom: calc(var(--marginOuter) / 4);
					}

					.grid li {
						width: 50%;
					}
					.grid video {
						width: calc(20rem * var(--ratio));
						max-width: calc((100vw - 3 * var(--marginOuter)) / 2);
					}
				}

				@media screen and (min-width: 1440px) {
					.project:not(:last-child) {
						margin-bottom: calc(
							16px * 3 + (16 * 7.5 - 16 * 3) * (100vw - 1440px) / (2560 - 1440)
						);
					}
				}
			`}</style>
		</article>
	);
}

export default ProjectFeed;
