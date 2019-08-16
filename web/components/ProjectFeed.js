import client from "../client";
import Link from "next/link";
import ProjectRowContainer from "../components/ProjectRowContainer";
import ProjectViewer from "../components/ProjectViewer";

function ProjectFeed(props) {
  const { posts, title = "", slug = "" } = props;

  return (
    <article className="projects">
      <h2>{title}</h2>
      <ul>
        {posts.map(
          ({ _id, title = "", slug = "", _updatedAt = "", content = [] }) =>
            slug && (
              <li key={_id} className="project">
                <h3>{title}</h3>
                <ProjectRowContainer content={content} id={_id} total={content.length} />
                <ProjectViewer content={content} id={_id} />
              </li>
            )
        )}
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

        .project h3 {
          padding: 0 var(--marginOuter);
        }

        @media screen and (min-width: 640px) {
          .projects h2 {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </article>
  );
}

export default ProjectFeed;
