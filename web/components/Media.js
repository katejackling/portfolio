import Img from "./Img";
import Video from "./Video";

function Media(props) {
	const { media, asset = "", type = "", fit = null, gif = false } = props;
	if (type === "image") {
		return <Img asset={asset} />;
	} else {
		return <Video asset={asset} gif={gif} controls={media && media.video.videoControls} />;
	}
}

export default Media;
