import { useState, useEffect, useDispatch, useGlobal } from "reactn";
import { throws } from "assert";
import Parser from "html-react-parser";
import useWindowSize from "../utils/hooks/useWindowSize";
import { useSpring, animated, interpolate, config } from "react-spring";
import { useGesture } from "react-use-gesture";
import { clamp, debounce } from "lodash";
import useLockBodyScroll from "../utils/hooks/useLockBodyScroll";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import ProjectViewer from "./ProjectViewer";

function ProjectViewerContainer(props) {
	const [clickEnabled, toggleClick] = useState(false),
		windowSize = useWindowSize(),
		[viewerTitle] = useGlobal("viewerTitle"),
		[slideIndex] = useGlobal("slideIndex"),
		[viewerOpen] = useGlobal("viewerOpen"),
		[viewerContent] = useGlobal("viewerContent"),
		[viewerSubhead] = useGlobal("viewerSubhead"),
		[viewerYear] = useGlobal("viewerYear");

	console.log(viewerContent);

	if (!viewerContent) return null;

	const resetViewerReducer = (global, dispatch, action) => ({
		viewerTitle: false,
		viewerOpen: false,
		viewerSubhead: false,
		viewerYear: false,
		viewerID: null,
		slideIndex: 0
	});

	const resetViewer = useDispatch(resetViewerReducer);

	const [{ y }, set] = useSpring(() => ({
		y: 0,
		onFrame: function(params) {
			let { y } = params;

			if (Math.abs(y) >= windowSize.height / 10) {
				resetViewer();
				toggleClick(true);
				history.pushState({}, "", "/");
			}
		}
	}));

	const bind = useGesture(
		{
			onDrag: ({ down, delta, velocity, temp = y.getValue() }) => {
				velocity = clamp(velocity, 1, 10);

				if (temp > 10) {
					toggleClick(false);
				} else {
					toggleClick(true);
				}

				set({
					y: down ? temp + delta[1] * (velocity < 1 ? 1 : velocity) : 0,
					config: {
						mass: 1,
						tension: 500 * (velocity < 2 ? 2 : velocity)
					}
				});
			},
			onWheel: ({ active, delta, velocity, temp = y.getValue() }) => {
				velocity = clamp(velocity, 1, 10);
				set({
					y: active ? temp + delta[1] * -1 * (velocity < 1 ? 1 : velocity) : 0,
					config: {
						mass: 1,
						tension: 500 * (velocity < 2 ? 2 : velocity)
					}
				});
			}
		},
		{ domTarget: window }
	);

	useEffect(bind, [bind]);

	useEffect(() => {
		let targetElement = document.querySelector("#viewer");
		disableBodyScroll(targetElement);
		return () => clearAllBodyScrollLocks();
	}, []);

	//useLockBodyScroll();

	return (
		<>
			<animated.div
				className="project__viewer__overlay"
				{...bind()}
				style={{
					opacity: y.interpolate(
						[-windowSize.height / 10, 0, windowSize.height / 10],
						[0, 1, 0]
					)
				}}
			>
				<h2 className="project__viewer__caption">
					<span className="title">{viewerTitle && viewerTitle.trim()}</span>
					<span className="extra">
						{viewerSubhead ? Parser(`, <em>${viewerSubhead.trim()}</em>`) : ""}
						{viewerYear ? `, ${viewerYear}` : ""}
					</span>
					<span className="counter">{`, ${slideIndex + 1}/${viewerContent.length}`}</span>
				</h2>
				{/* <h2 className="project__viewer__caption">{`${viewerTitle} ${slideIndex + 1}/${
					viewerContent.length
				}`}</h2> */}
			</animated.div>
			<animated.section
				id="viewer"
				className="project__viewer"
				{...bind()}
				style={{
					transform: viewerOpen ? y.interpolate(y => `translate3d(0,${y}px,0)`) : "none",
					opacity: y.interpolate(
						[-windowSize.height / 10, 0, windowSize.height / 10],
						[0, 1, 0]
					)
				}}
			>
				<ProjectViewer content={viewerContent} clickEnabled={clickEnabled} />
				<style jsx global>{`
					.project__viewer {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: calc(100 * var(--vH));
						z-index: 9;
						user-select: none;
						cursor: grab;
					}
					.project__viewer:active {
						cursor: grabbing !important;
						cursor: -moz-grabbing !important;
						cursor: -webkit-grabbing !important;
					}
					.project__viewer__overlay {
						position: fixed;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						z-index: 8;
						background: white;
					}

					.project__viewer__caption {
						position: fixed;
						left: 0;
						bottom: 0;
						width: 100%;
						padding: var(--marginOuter);
						z-index: 12;
					}
					.project__viewer ul {
						position: relative;
						width: 100%;
						height: 100%;
					}

					.project__viewer li {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}

					.project__viewer li.hidden {
						visibility: hidden;
						z-index: -1;
					}

					.project__viewer figure {
						width: 100%;
						height: 100%;
						position: relative;
					}

					.project__viewer figure:not(.pair) img,
					.project__viewer figure:not(.pair) .player__wrapper {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						cursor: pointer;
					}

					[data-orientation="portrait"] video {
						width: auto;
						height: 100%;
					}

					[data-orientation="landscape"] video {
						width: 100%;
						height: auto;
					}

					.project__viewer img,
					.project__viewer video {
						-moz-user-select: none;
						-webkit-user-select: none;
						-ms-user-select: none;
						user-select: none;
						-webkit-user-drag: none;
						user-drag: none;
						-webkit-touch-callout: none;
					}

					.project__viewer figure.contain {
						max-width: 100vmin;
						margin: 0 auto;
					}

					.project__viewer figure.contain [data-orientation="landscape"] {
						width: 100%;
						height: auto;
						padding: var(--headerH) 0;
					}

					.project__viewer figure.contain [data-orientation="portrait"] {
						width: auto;
						height: 100%;
						padding: var(--headerH) 3rem;
					}

					.project__viewer figure.cover [data-orientation="landscape"] {
						width: auto;
						height: 100%;
					}

					.project__viewer figure.cover [data-orientation="portrait"] {
						width: 100%;
						height: auto;
					}

					.project__viewer figure.cover [data-orientation="portrait"],
					.project__viewer figure.cover [data-orientation="landscape"],
					.project__viewer figure.cover img,
					.project__viewer figure.cover video {
						width: 100%;
						height: 100%;
					}

					figure.pair {
						max-width: calc(100vmin - 3rem + var(--marginOuter) / 2);
						display: flex;
						flex-wrap: nowrap;
						justify-content: center;
						padding: calc(var(--headerH) - var(--marginOuter) / 2)
							calc(var(--marginOuter) / 2);
						margin: 0 auto;
					}
					figure.pair img,
					figure.pair video {
						width: 50%;
						height: 100%;
						object-fit: contain;
						padding: calc(var(--marginOuter) / 2);
					}

					@media screen and (max-width: 639px) {
						.extra {
							display: none;
						}
					}

					@media screen and (min-width: 640px) {
						.project__viewer figure.contain [data-orientation="landscape"] {
							padding: var(--headerH) 3rem;
						}
					}
				`}</style>
			</animated.section>
		</>
	);
}

export default ProjectViewerContainer;
