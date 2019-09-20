import { useState, useEffect, useDispatch, useGlobal } from "reactn";

import useWindowSize from "../utils/hooks/useWindowSize";
import { capitalize } from "../scripts/utils";
import { useHotkeys } from "react-hotkeys-hook";
import * as ViewerSections from "./viewer";

function ProjectViewer(props) {
	const { content, clickEnabled } = props,
		[slideIndex, setSlide] = useGlobal("slideIndex");
	let currIndex = slideIndex;

	let resolveSections = section => {
		// eslint-disable-next-line import/namespace
		const Section = ViewerSections[capitalize(section._type)];
		if (Section) {
			return Section;
		}
		console.error("Cant find section", section); // eslint-disable-line no-console
		return null;
	};

	const resetViewerReducer = (global, dispatch, action) => ({
		viewerOpen: false,
		viewerID: null,
		slideIndex: 0
	});
	const resetViewer = useDispatch(resetViewerReducer);

	useHotkeys("right", () => {
		let newIndex = currIndex === content.length - 1 ? 0 : currIndex + 1;
		setSlide(newIndex);
		currIndex = newIndex;
	});
	useHotkeys("left", () => {
		let newIndex = currIndex === 0 ? content.length - 1 : currIndex - 1;
		setSlide(newIndex);
		currIndex = newIndex;
	});
	useHotkeys("esc", () => resetViewer());

	return (
		<ul>
			{content.map((section, i) => {
				const ViewerSection = resolveSections(section);
				if (!ViewerSection) {
					return <div>Missing section {section._type}</div>;
				}
				return (
					<li
						key={section._key}
						className={slideIndex === i ? "visible" : "hidden"}
						onMouseUp={() => {
							console.log(i);

							if (clickEnabled) {
								setSlide(slideIndex === content.length - 1 ? 0 : i + 1);
							}
						}}
					>
						<ViewerSection {...section} />
					</li>
				);
			})}
		</ul>
	);
}

export default ProjectViewer;
