import { useState, useCallback, useEffect, setGlobal } from "reactn";

function getDimensionObject(node) {
	const rect = node.getBoundingClientRect();

	return {
		width: rect.width,
		height: rect.height,
		scrollWidth: node.scrollWidth,
		scrollHeight: node.scrollHeight,
		top: "x" in rect ? rect.x : rect.top,
		left: "y" in rect ? rect.y : rect.left,
		x: "x" in rect ? rect.x : rect.left,
		y: "y" in rect ? rect.y : rect.top,
		right: rect.right,
		bottom: rect.bottom
	};
}

function useDimensions(global) {
	const [dimensions, setDimensions] = useState({});
	const [node, setNode] = useState(null);

	const ref = useCallback(node => {
		setNode(node);
	}, []);

	useEffect(() => {
		if (node) {
			setDimensions(getDimensionObject(node));

			const measure = () => {
				window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
				// if (!global) {
				// 	let globalObj = { [global.global]: getDimensionObject(node) };
				// 	// console.log(getDimensionObject(node), global.global, globalObj);
				// 	setGlobal(globalObj);
				// }
			};

			window.addEventListener("resize", measure);
			// window.addEventListener("scroll", measure);

			return () => {
				window.removeEventListener("resize", measure);
				// window.removeEventListener("scroll", measure);
			};
		}
	}, [node]);

	return [ref, dimensions, node];
}

export default useDimensions;
