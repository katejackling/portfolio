import { render } from "react-dom";
import React from "react";
import { useSpring, animated, interpolate, config } from "react-spring";
import { useGesture } from "react-use-gesture";
import { clamp } from "lodash";

const boundaries = { left: -100, right: 0 };

function Test(props) {
	const [{ x }, set] = useSpring(() => ({
		x: 0,
		config: { mass: 1, tension: 300, friction: 20 }
	}));
	const bind = useGesture({
		onDrag: ({ down, delta, temp = [x.getValue()] }) => {
			const { right, left } = boundaries;
			console.log(down, delta, temp, right, left);
			// set({
			// 	x: temp[0] + delta[0]
			// });
			set({
				x: down
					? clamp(temp[0] + delta[0], left - 30, right + 30)
					: clamp(temp[0] + delta[0], left, right)
			});
			console.log(temp[0], delta[0]);
			return temp;
		}
	});

	return (
		<div id="root">
			<animated.div
				{...bind()}
				style={{ transform: interpolate([x], x => `translate3d(${x}px,0,0)`) }}
			/>
			<style jsx global>{`
				#root {
					width: 280px;
					height: 280px;
					background: lavender;
					border-radius: 16px;
				}

				#root > div {
					width: 380px;
					height: 80px;
					background: hotpink;
					border-radius: 16px;
					cursor: -webkit-grab;
					display: flex;
					flex-shrink: 0;
					align-items: center;
					justify-content: center;
					color: white;
					white-space: pre;
					will-change: transform;
				}

				#root > div:active {
					cursor: -webkit-grabbing;
				}
			`}</style>
		</div>
	);
}

export default Test;
