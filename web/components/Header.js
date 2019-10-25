import { useState, useRef, useEffect, useGlobal, useDispatch } from "reactn";

import useDimensions from "../utils/hooks/useDimensions";
import { setCustomProperty } from "../utils/scripts/helpers.js";
import { useSpring, animated, interpolate, config } from "react-spring";
import * as Scroll from "react-scroll";

function Header(props) {
	const [headerRef, headerDimensions] = useDimensions(),
		[headerSize, setHeaderSize] = useGlobal("headerSize"),
		[navOpen, toggleNav] = useGlobal("navOpen"),
		[viewerOpen, toggleViewer] = useGlobal("viewerOpen"),
		[sectionActive, setSection] = useGlobal("sectionActive");

	let Link = Scroll.Link;
	let Element = Scroll.Element;
	let Events = Scroll.Events;
	let animateScroll = Scroll.animateScroll;

	const resetViewerReducer = (global, dispatch, action) => ({
		viewerTitle: false,
		viewerOpen: false,
		viewerSubhead: false,
		viewerYear: false,
		viewerID: null,
		slideIndex: 0
	});
	const resetViewer = useDispatch(resetViewerReducer);

	Events.scrollEvent.register("begin", function(to, element) {
		navOpen && toggleNav(false);
		if (viewerOpen) {
			resetViewer();
			history.pushState({}, "", "/");
		}
	});

	let offsetHeader = headerDimensions && headerDimensions.height * -1;

	//setHeaderSize(headerDimensions.height);

	const keyDown = () => {
		if (!viewerOpen) {
			if (event.keyCode == 38) {
				event.preventDefault();
				animateScroll.scrollMore(-window.innerHeight);
			} else if (event.keyCode == 40) {
				event.preventDefault();
				animateScroll.scrollMore(window.innerHeight);
			}
		}
	};

	useEffect(() => {
		setCustomProperty("--headerH", `${headerDimensions ? headerDimensions.height : 0}px`);
		document.addEventListener("keydown", keyDown);

		return () => {
			document.removeEventListener("keydown", keyDown);
		};
	}, [keyDown]);

	return (
		<header ref={headerRef} data-nav-active={navOpen}>
			<h1>Kate Jackling</h1>
			<button onClick={() => toggleNav(!navOpen)}>{navOpen ? "Close" : "Menu"}</button>
			<nav>
				<ul className={sectionActive && !viewerOpen ? "sections--active" : ""}>
					<li
						className={
							sectionActive === "stilllife" && !viewerOpen ? "section--active" : ""
						}
					>
						<Link
							to="stilllife"
							offset={offsetHeader}
							spy={true}
							smooth={true}
							duration={500}
						>
							Still Life
						</Link>
					</li>
					<li
						className={
							sectionActive === "commercial" && !viewerOpen ? "section--active" : ""
						}
					>
						<Link
							to="commercial"
							offset={offsetHeader}
							spy={true}
							smooth={true}
							duration={500}
						>
							Commercial
						</Link>
					</li>
					<li
						className={sectionActive === "film" && !viewerOpen ? "section--active" : ""}
					>
						<Link
							to="film"
							offset={offsetHeader}
							spy={true}
							smooth={true}
							duration={500}
						>
							Film
						</Link>
					</li>
					<li
						className={sectionActive === "info" && !viewerOpen ? "section--active" : ""}
					>
						<Link
							to="info"
							offset={offsetHeader}
							spy={true}
							smooth={true}
							duration={500}
						>
							Info
						</Link>
					</li>
				</ul>
			</nav>
			<style jsx global>{`
				header {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					padding: var(--marginOuter);
					z-index: 99;
				}

				header a {
					display: inline;
				}

				nav nav ul li {
					cursor: pointer;
				}

				@media screen and (max-width: 639px) {
					header {
						display: flex;
						justify-content: space-between;
						align-content: flex-start;
						flex-wrap: wrap;
					}

					nav {
						width: 100%;
						margin-top: var(--marginMedium);
						font-size: var(--font-size--large);
						line-height: 1.045;
					}

					header[data-nav-active="true"] {
						height: calc(100 * var(--vH));
						background: white;
					}

					header[data-nav-active="true"] > * {
						align-self: flex-start;
					}

					header[data-nav-active="false"] nav {
						display: none;
					}
				}

				@media screen and (min-width: 640px) {
					header button {
						display: none;
					}

					nav ul {
						display: flex;
					}

					nav ul.sections--active li:not(.section--active):not(:hover) {
						color: rgba(0, 0, 0, 0.5);
					}

					html:not(.is--touch)
						nav:not(:hover)
						ul.sections--active
						li:not(.section--active) {
						display: none;
					}

					html:not(.is--touch) nav:not(:hover) ul.sections--active li.section--active {
						font-style: italic;
					}

					html:not(.is--touch)
						nav:not(:hover)
						ul.sections--active
						li.section--active::after {
						content: "";
						margin: 0;
					}

					nav ul li:not(:last-child)::after {
						content: ", ";
						margin-right: 0.25em;
					}
				}
			`}</style>
		</header>
	);
}

export default Header;
