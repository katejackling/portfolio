import ReactPlayer from "react-player";
import { useState, useGlobal } from "reactn";
import SVG from "react-inlinesvg";
import useClientFetch from "../utils/hooks/useClientFetch";
import iconPlay from "../static/ui/play.svg";
import iconPause from "../static/ui/pause.svg";

function Video(props) {
	const { controls, asset, gif } = props,
		[playing, togglePlay] = useState(!controls),
		[mediaHover, setMediaHover] = useGlobal("mediaHover"),
		video = useClientFetch(`*[_id == "${asset._ref}"][0]`);

	if (!video) {
		return null;
	}

	const handlePlayPause = () => {
		togglePlay(!playing);
	};

	const { playbackId, data } = video;
	const width = parseInt(data.aspect_ratio.split(":")[0]),
		height = parseInt(data.aspect_ratio.split(":")[1]),
		aspectRatio = width / height;

	if (gif) {
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
				onClick={handlePlayPause}
				onMouseOver={() => setMediaHover(true)}
				onMouseOut={() => setMediaHover(false)}
				data-playing={playing}
				data-orientation={aspectRatio < 1 ? "portrait" : "landscape"}
				width=""
				height=""
				playsinline={!controls}
				playing={playing}
				loop
				muted={!controls}
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
				<button className="btn__toggle--play" onClick={handlePlayPause}>
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

				body:not(.is--touch)
					[data-playing="true"]:not(:hover)
					+ .btn__toggle--play:not(:hover),
				body.is--touch [data-playing="true"] + .btn__toggle--play {
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

export default Video;
