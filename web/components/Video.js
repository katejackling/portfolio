import client from "../client";
import ReactPlayer from "react-player";
import SVG from "react-inlinesvg";

// Using extension .svgz to avoid svgr loader in webpack
import iconPlay from "../static/ui/play.svg";
import iconPause from "../static/ui/pause.svg";

class Video extends React.Component {
	state = {
		video: "",
		playing: !this.props.controls,
		controls: this.props.controls
	};

	//videoRef = React.createRef();

	componentDidMount() {
		client
			.fetch(`*[_id == "${this.props.asset._ref}"][0]`)
			.then(video => this.setState({ video }));
	}

	handlePlayPause = () => {
		this.setState({ playing: !this.state.playing });
	};

	render() {
		const { video, playing, controls } = this.state;
		if (!video) return <div>Loading...</div>;

		const { playbackId, data } = video;
		const width = parseInt(data.aspect_ratio.split(":")[0]),
			height = parseInt(data.aspect_ratio.split(":")[1]),
			aspectRatio = width / height;

		if (this.props.gif) {
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
			<>
				<ReactPlayer
					onClick={this.handlePlayPause}
					data-playing={playing}
					data-orientation={aspectRatio < 1 ? "portrait" : "landscape"}
					width=""
					height=""
					playsinline={!controls}
					playing={playing}
					loop
					muted={controls}
					className="player__wrapper"
					config={{
						file: {
							forceHLS: true,
							attributes: {
								style: {}
							}
						}
					}}
					style={{ "--ratio": aspectRatio }}
					url={`https://stream.mux.com/${playbackId}`}
				/>
				{controls && (
					<button className="btn__toggle--play" onClick={this.handlePlayPause}>
						<SVG src={playing ? iconPause : iconPlay} />
					</button>
				)}
				<style jsx global>{`
					.btn__toggle--play {
						position: absolute;
						top: calc(50% - 1.5rem);
						left: 50%;
						width: auto;
						height: 3rem;
						transform: translateX(-50%);
						transition: transform 0.1s, opacity 0.6s;
						z-index: 88;
						opacity: 0.8;
					}

					[data-playing="true"]:not(:hover) + .btn__toggle--play:not(:hover) {
						opacity: 0;
					}

					.btn__toggle--play:hover {
						transform: scale(1.1) translateX(-50%);
						opacity: 1;
					}

					.btn__toggle--play > svg {
						width: auto;
						height: 100%;
						display: block;
					}

					svg:not (:root ) {
						width: auto;
						height: 100%;
					}

					@media screen and (max-width: 639px) {
					}
				`}</style>
			</>
		);
	}
}

export default Video;
