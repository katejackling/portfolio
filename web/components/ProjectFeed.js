import client from "../client";
import Link from "next/link";
import ProjectRow from "../components/ProjectRow";
import ProjectViewer from "../components/ProjectViewer";

function ProjectFeed(Props) {
	const { posts } = Props;
	console.log(posts);
	return (
		<div>
			<h1>Welcome to a blog!</h1>
			{posts.map(
				({ _id, title = "", slug = "", _updatedAt = "", content = [] }) =>
					slug && (
						<li key={_id}>
							<Link href="/p/[id]" as={`/p/${slug.current}`}>
								<a>{slug.current}</a>
							</Link>{" "}
							({new Date(_updatedAt).toDateString()})
							<ProjectRow content={content} />
							<ProjectViewer />
						</li>
					)
			)}
		</div>
	);
}

export default ProjectFeed;
