import client from "../client";
import ReactPlayer from "react-player";
import { Fragment } from "react";

class Video extends React.Component {
  state = {
    video: ""
  };

  //videoRef = React.createRef();

  componentDidMount() {
    client.fetch(`*[_id == "${this.props.asset._ref}"][0]`).then(video => this.setState({ video }));
  }
  render() {
    if (!this.state.video) return <div>Loading...</div>;
    return (
      <ReactPlayer
        width=""
        height=""
        playsinline
        playing
        loop
        className="player__wrapper"
        config={{
          file: {
            forceHLS: true,
            attributes: {
              style: {}
            }
          }
        }}
        url={`https://stream.mux.com/${this.state.video.playbackId}`}
      />
    );
  }
}

export default Video;
