import BlockContent from "@sanity/block-content-to-react";
import client from "../client";

const serializers = {
	marks: {
		uppercase: props => <span style={{ textTransform: "uppercase" }}>{props.children}</span>
	}
};

function Block(props) {
	const { blocks } = props;

	if (!blocks) {
		console.error("Missing blocks");
		return null;
	}

	return <BlockContent blocks={blocks} serializers={serializers} {...client.config()} />;
}

// About.propTypes = {
//   blocks: PropTypes.arrayOf(PropTypes.object)
// }

export default Block;
