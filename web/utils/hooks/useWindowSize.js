import { useState, useEffect } from "react";
import { setCustomProperty } from "../scripts/helpers.js";

export default function useWindowSize() {
	const isClient = typeof window === "object";

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function setSize() {
			let windowSize = getSize();
			setWindowSize(windowSize);
		}

		setSize();

		window.addEventListener("resize", setSize);
		return () => window.removeEventListener("resize", setSize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
}
