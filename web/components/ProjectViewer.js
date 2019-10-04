import { useState, useEffect, useDispatch, useGlobal } from "reactn";

import useWindowSize from "../utils/hooks/useWindowSize";
import { capitalize } from "../utils/scripts/helpers";
import { useHotkeys } from "react-hotkeys-hook";
import * as ViewerSections from "./viewer";

function ProjectViewer(props) {
	const { content, clickEnabled } = props,
		[slideIndex, setSlide] = useGlobal("slideIndex"),
		[nextIndex, setNextIndex] = useState(
			slideIndex === content.length - 1 ? 0 : slideIndex + 1
		),
		[prevIndex, setPrevIndex] = useState(
			slideIndex === 0 ? content.length - 1 : slideIndex - 1
		);

	const goNext = () => {
		// console.log(clickEnabled);

		if (!clickEnabled) {
			return false;
		}
		setPrevIndex(slideIndex);
		setSlide(nextIndex);
		setNextIndex(nextIndex === content.length - 1 ? 0 : nextIndex + 1);
	};

	const goPrev = () => {
		setPrevIndex(prevIndex === 0 ? content.length - 1 : prevIndex - 1);
		setSlide(prevIndex);
		setNextIndex(slideIndex);
	};

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

	const keyDown = () => {
		if (event.keyCode == 37) {
			goPrev();
		} else if (event.keyCode == 39) {
			goNext();
		} else if (event.keyCode == 27) {
			resetViewer();
			history.pushState({}, "", "/");
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", keyDown);

		return () => {
			document.removeEventListener("keydown", keyDown);
		};
	}, [keyDown]);

	window.onpopstate = event => {
		resetViewer();
	};

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
						onClick={() => {
							goNext();
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
