import Img from "./Img";
import Video from "./Video";

function Media(props) {
  const { asset = "", type = "", fit = null } = props;

  if (type === "image") {
    return <Img asset={asset} fit={fit && fit} />;
  } else {
    return <Video asset={asset} fit={fit && fit} />;
  }
}

export default Media;
