import Img from "./Img";
import Video from "./Video";

function Media(props) {
	const { asset = "", type = "", fit = null, gif = false } = props;

	if (type === "image") {
		return <Img asset={asset} fit={fit && fit} />;
	} else {
		return <Video asset={asset} fit={fit && fit} gif={gif} />;
	}
}

export default Media;
