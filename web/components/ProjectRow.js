import { useContext } from "react";
import { Context } from "./Context";

import useLockBodyScroll from "../utils/useLockBodyScroll";

import client from "../client";
import Media from "./Media";

function ProjectRow(props) {
	let setSlide = (slideIndex, viewerID) => () => {
		dispatch({ type: "set-slide", payload: slideIndex });
		dispatch({ type: "set-viewer", payload: viewerID });
		dispatch({ type: "increment" });
	};

	let { state, dispatch } = useContext(Context);
	const { content, id, total } = props;

	return (
		<ul>
			{content.map(
				(
					{
						_key,
						_type,
						media = undefined,
						media_left = undefined,
						media_right = undefined
					},
					i
				) => {
					if (_type !== "viewerPair") {
						return (
							<>
								<li key={_key}>
									<figure>
										<Media
											type={media && media.type}
											asset={
												media && media.type === "video"
													? media.video.mux.asset
													: media.image.asset
											}
											gif={media && media.type === "video"}
										/>
										<figcaption>
											{i + 1}/{total}
										</figcaption>
									</figure>
								</li>
								<li key={_key}>
									<figure>
										<Media
											type={media && media.type}
											asset={
												media && media.type === "video"
													? media.video.mux.asset
													: media.image.asset
											}
											gif={media && media.type === "video"}
										/>
										<figcaption>
											{i + 1}/{total}
										</figcaption>
									</figure>
								</li>
								<li key={_key}>
									<figure>
										<Media
											type={media && media.type}
											asset={
												media && media.type === "video"
													? media.video.mux.asset
													: media.image.asset
											}
											gif={media && media.type === "video"}
										/>
										<figcaption>
											{i + 1}/{total}
										</figcaption>
									</figure>
								</li>
								<li key={_key}>
									<figure>
										<Media
											type={media && media.type}
											asset={
												media && media.type === "video"
													? media.video.mux.asset
													: media.image.asset
											}
											gif={media && media.type === "video"}
										/>
										<figcaption>
											{i + 1}/{total}
										</figcaption>
									</figure>
								</li>
							</>
						);
					} else {
						return (
							<>
								<li key={_key + "_left"} onClick={setSlide(i, id)}>
									<figure>
										<Media
											type={media_left && media_left.type}
											asset={
												media_left && media_left.type === "video"
													? media_left.video.mux.asset
													: media_left.image.asset
											}
											gif={media_left && media_left.type === "video"}
										/>
										<figcaption>
											{i + 1}/{total}
										</figcaption>
									</figure>
								</li>
								<li key={_key + "_right"} onClick={setSlide(i, id)}>
									<figure>
										<Media
											type={media_right && media_right.type}
											asset={
												media_right && media_right.type === "video"
													? media_right.video.mux.asset
													: media_right.image.asset
											}
											gif={media_right && media_right.type === "video"}
										/>
										<figcaption>
											{i + 1}/{total}
										</figcaption>
									</figure>
								</li>{" "}
							</>
						);
					}
				}
			)}
		</ul>
	);
}

export default ProjectRow;

// console.log(
// 	content[0].media.type && content[0].media.type === "video"
// 		? content[0].media.video.mux.asset
// 		: content[0].media.image.asset
// );
