import { useState, useRef, useGlobal, useEffect } from "reactn";

import useMeasure from "../utils/hooks/useMeasure";
import useWindowSize from "../utils/hooks/useWindowSize";
import ScrollBooster from "scrollbooster";
import { useSpring, animated, interpolate, config } from "react-spring";

import Media from "./Media";
import ProjectRow from "../components/ProjectRow";

function ProjectRowContainer(props) {
	const [sliderRef, sliderSize] = useMeasure(),
		[contentRef, contentSize] = useMeasure(),
		[clickEnabled, toggleClick] = useState(true);

	let sliderBoundaries = { left: sliderSize.width - contentSize.width, right: 0 };
	let sliderEnabled = contentSize.width > sliderSize.width ? true : false;

	let elemRef = useRef();

	//console.log(sliderSize, contentSize);

	const { content, id, total, slug, additional_info, year } = props;

	if (sliderEnabled) {
		let scrollPos;

		const sb = new ScrollBooster({
			viewport: sliderRef.ref.current,
			content: contentRef.ref.current,
			bounce: false,
			mode: "x",
			// onClick: (data, event) => {
			// 	if (Math.abs(data.dragOffsetPosition.x) > 5) {
			// 		event.stopPropagation();
			// 		toggleClick(false);
			// 	} else {
			// 		toggleClick(true);
			// 	}
			// },
			onUpdate: data => {
				if (Math.abs(data.dragOffsetPosition.x) > 5) {
					toggleClick(false);
				} else {
					toggleClick(true);
				}
				console.log(data.position.x);
				sliderRef.ref.current.scrollLeft = data.position.x;
			}
		});
	}

	return (
		<div className="slider" {...sliderRef}>
			<animated.div
				className="slider__wrapper"
				{...contentRef}
				// style={{
				// 	transform: sliderEnabled
				// 		? interpolate([x], x => `translate3d(${x}px,0,0)`)
				// 		: "none"
				// }}
			>
				<ProjectRow
					content={content}
					id={id}
					total={total}
					clickEnabled={clickEnabled}
					slug={slug}
					additional_info={additional_info}
					year={year}
				/>
			</animated.div>
			<style jsx global>{`
				.slider {
					width: 100%;
					overflow: hidden;
					user-select: none;
					--counterW: calc(2.5em + 0.3rem);
				}

				html.is--touch .slider {
					overflow-x: scroll;
					overflow-y: hidden;
					-webkit-overflow-scrolling: touch;
				}

				.slider img.lazyloaded {
					transition: 0.5s;
				}

				html:not(.is--touch) .slider:hover li:not(:hover) img,
				html:not(.is--touch) .slider:hover li:not(:hover) video {
					opacity: 0.33;
				}

				{/* .slider img.lazyloaded {
					transition: none;
				}

				.row .project {
					transition: 0.5s;
				}

				html:not(.is--touch) .row:hover .project:hover li:not(:hover) img,
				html:not(.is--touch) .row:hover .project:hover li:not(:hover) video {
					opacity: ${mediaHover ? 0.4 : 1};
				}

				html:not(.is--touch) .row:hover .project:not(:hover),
				html:not(.is--touch) .row:hover .project:not(:hover) {
					opacity: 0.1;
				} */}

				.slider__wrapper {
					display: inline-block;
					min-width: 100%;
				}

				html.is--touch .slider__wrapper {
					transform: none !important;
				}

				.slider ul {
					display: flex;
					justify-content: space-between;
					padding: calc(var(--marginOuter) / 2);
					padding-top: 0;
				}

				.slider li {
					display: flex;
					flex-wrap: nowrap;
					padding: calc(var(--marginOuter) / 2);
					padding-top: 0;
				}

				.slider li figure {
					position: relative;
				}

				.slider li figure:nth-child(2) {
					margin-left: var(--marginOuter);
				}

				.slider img,
				.slider video {
					cursor: pointer;
					-moz-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					user-select: none;
					-webkit-user-drag: none;
					user-drag: none;
					-webkit-touch-callout: none;
					height: calc(
						16px * 6.5 + (16 * 7.5 - 16 * 6.5) * (100vw - 360px) / (1440 - 360)
					);
					width: auto !important;
				}

				@media screen and (max-width: 639px) {
				}

				@media screen and (min-width: 640px) {
					.slider li figure {
						 {
							/* 
							padding: 0 calc((var(--marginOuter) / 2 + 1rem + 1rem) * 1.5) 0 0;
							background: red; */
						}
						padding-right: var(--counterW);
					}

					.slider ul {
						counter-reset: section;
						padding-top: calc(var(--marginOuter) / 4);
					}

					.slider li {
						counter-increment: section;
					}

					.slider li figure figcaption {
						width: calc((var(--marginOuter) / 2 + 1rem + 1rem) * 1.5);
						width: var(--counterW);
						position: absolute;
						top: -0.17em;
						right: 0;
						white-space: nowrap;
						padding-left: 0.3rem;
					}
				}
				@media screen and (min-width: 1440px) {
					.slider img,
					.slider video {
						height: calc(
							16px * 7.5 + (16 * 11.5 - 16 * 7.5) * (100vw - 1440px) / (2560 - 1440)
						);
					}
				}
			`}</style>
			<style jsx>{`
				.slider {
					${sliderEnabled ? "cursor: grab !important;" : ""}
				}

				.slider:active {
					${sliderEnabled
						? "cursor: grabbing !important; cursor: -moz-grabbing !important; cursor: -webkit-grabbing !important;"
						: ""}
				}
			`}</style>
		</div>
	);
}

export default ProjectRowContainer;
