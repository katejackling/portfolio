import client from "../client";
import ReactPlayer from "react-player";

class Video extends React.Component {
	state = {
		video: ""
	};

	//videoRef = React.createRef();

	componentDidMount() {
		client
			.fetch(`*[_id == "${this.props.asset._ref}"][0]`)
			.then(video => this.setState({ video }));
	}
	render() {
		if (!this.state.video) return <div>Loading...</div>;

		const { playbackId, data } = this.state.video;
		console.log(this.state.video);

		if (this.props.gif) {
			const width = parseInt(data.aspect_ratio.split(":")[0]),
				height = parseInt(data.aspect_ratio.split(":")[1]),
				aspectRatio = width / height;

			return (
				<img
					className="lazyload"
					src={`data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'  width%3D'${width}' height%3D'${height}' viewBox%3D'0 0 ${width} ${height}'%2F%3E"`}
					data-src={`https://image.mux.com/${playbackId}/animated.gif?end=2.5`}
					sizes="auto"
					data-orientation={aspectRatio < 1 ? "portrait" : "landscape"}
					style={{ "--imgRatio": aspectRatio }}
				/>
			);
		}
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
				url={`https://stream.mux.com/${playbackId}`}
			/>
		);
	}
}

export default Video;
