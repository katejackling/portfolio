import { useGlobal, useRef } from "reactn";

import ProjectFeedContainer from "../components/ProjectFeedContainer";
import ProjectViewerContainer from "../components/ProjectViewerContainer";

function Projects(props) {
	const [viewerOpen] = useGlobal("viewerOpen");

	console.log(viewerOpen);

	return (
		<>
			<ProjectFeedContainer type="stilllife" />
			<ProjectFeedContainer type="commercial" />
			<ProjectFeedContainer type="film" />
			{viewerOpen && <ProjectViewerContainer />}
		</>
	);
}

export default Projects;
