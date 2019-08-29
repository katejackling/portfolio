import client from "../client";
import Link from "next/link";
import ProjectRowContainer from "./ProjectRowContainer";
import ProjectGridContainer from "./ProjectGridContainer";

function ProjectFeed(props) {
	const { posts, title = "", type = "" } = props;

	console.log(type);

	return (
		<article id={type} className={type !== "film" ? "projects row" : "projects grid"}>
			<h2>{title}</h2>
			<ul>
				{posts.map(({ _id, title = "", slug = "", content = [], mediaFeatured }) => {
					let total = 0;

					content.forEach(slide => {
						total = total + (slide.hasOwnProperty("media_right") ? 2 : 1);
					});

					return (
						slug && (
							<li key={_id} className="project">
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
				.projects:not(:last-child),
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
					width: 100%;
				}

				.grid img,
				.grid video {
					pointer-events: none;
					object-fit: contain;
					object-position: top left;
					height: 100%;
					user-select: none;
				}

				@media screen and (max-width: 639px) {
					.grid li {
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
					.grid li video {
						max-height: 20rem;
					}
				}
			`}</style>
		</article>
	);
}

export default ProjectFeed;
