import ProjectFeed from "../components/ProjectFeed";
import { capitalize } from "../utils/scripts/helpers";
import useClientFetch from "../utils/hooks/useClientFetch";

function ProjectFeedContainer(props) {
	const { type } = props;
	const data = useClientFetch(`*[_type=="home"][0]{${type}[]->}`);

	if (!data) {
		return null;
	}
	return <ProjectFeed title={capitalize(type)} type={type} posts={data[type]} />;
}

export default ProjectFeedContainer;
