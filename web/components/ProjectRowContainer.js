import { useState, useLayoutEffect, useRef } from "react";
import { withRouter } from "next/router";
import useMeasure from "../utils/hooks/useMeasure";
import useWindowSize from "../utils/hooks/useWindowSize";
import { useSpring, animated, interpolate, config } from "react-spring";
import { useGesture } from "react-use-gesture";
import { clamp } from "lodash";

import client from "../client";

import Media from "./Media";
import ProjectRow from "../components/ProjectRow";

function ProjectRowContainer(props) {
	const [sliderRef, sliderSize] = useMeasure();
	const [contentRef, contentSize] = useMeasure();
	const [clickEnabled, toggleClick] = useState(false);

	let sliderBoundaries = { left: sliderSize.width - contentSize.width, right: 0 };
	let sliderEnabled = contentSize.width > sliderSize.width ? true : false;

	const [{ x }, set] = useSpring(() => ({
		x: 0,
		config: { mass: 2, tension: 1000, friction: 100 },
		onRest: function() {
			toggleClick(true);
		}
	}));
	const bind = useGesture({
		onDrag: ({ down, delta, velocity, distance, direction, time, temp = [x.getValue()] }) => {
			const { right, left } = sliderBoundaries;
			// console.log(down, delta, velocity, distance, direction, time);
			set({
				x: down
					? clamp(
							temp[0] + delta[0],
							left - sliderSize.width * 0.1,
							right + sliderSize.width * 0.1
					  )
					: clamp(temp[0] + delta[0] * (velocity < 1 ? 1 : velocity * 2), left, right)
			});
			toggleClick(!down);
			return temp;
		}
	});

	const { content, id, total } = props;

	return (
		<div className="slider" {...sliderRef}>
			<animated.div
				className="slider__wrapper"
				{...bind()}
				{...contentRef}
				style={{
					transform: sliderEnabled
						? interpolate([x], x => `translate3d(${x}px,0,0)`)
						: "none"
				}}
			>
				<ProjectRow content={content} id={id} total={total} clickEnabled={clickEnabled} />
			</animated.div>
			<style jsx global>{`
				.slider {
					width: 100%;
					overflow-x: hidden;
					overflow-y: hidden;
					user-select: none;
				}

				.slider__wrapper {
					display: inline-block;
					min-width: 100%;
				}

				.slider ul {
					display: flex;
					justify-content: space-between;
					padding: calc(var(--marginOuter) / 2);
				}

				.slider li {
					display: flex;
					flex-wrap: nowrap;
					padding: calc(var(--marginOuter) / 2);
				}

				.slider li figure {
					position: relative;
				}

				.slider li figure:nth-child(2) {
					margin-left: var(--marginOuter);
				}

				.slider img,
				.slider video {
					pointer-events: none;
					height: 10rem !important;
					width: auto !important;
					user-select: none;
				}

				@media screen and (max-width: 639px) {
				}

				@media screen and (min-width: 640px) {
					.slider li figure {
						padding: 0 calc((var(--marginOuter) / 2 + 1rem + 1rem) * 1.5) 0 0;
						 {
							/* background: red; */
						}
					}

					.slider ul {
						counter-reset: section;
					}

					.slider li {
						counter-increment: section;
					}

					.slider li figure figcaption {
						width: calc((var(--marginOuter) / 2 + 1rem + 1rem) * 1.5);
						position: absolute;
						top: 0;
						right: 0;
						white-space: nowrap;
						padding: 0 0.5rem;
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
