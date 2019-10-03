import { useState, useRef, useEffect, useGlobal } from "reactn";

import useDimensions from "../utils/hooks/useDimensions";
import { setCustomProperty } from "../utils/scripts/helpers.js";
import { useSpring, animated, interpolate, config } from "react-spring";
import * as Scroll from "react-scroll";

function Header(props) {
	const [headerRef, headerDimensions] = useDimensions({ global: "headerSize" }),
		[headerSize] = useGlobal("headerSize"),
		[navOpen, toggleNav] = useGlobal("navOpen"),
		[sectionActive, setSection] = useGlobal("sectionActive");

	let Link = Scroll.Link;
	let Element = Scroll.Element;
	let Events = Scroll.Events;

	Events.scrollEvent.register("begin", function(to, element) {
		navOpen && toggleNav(false);
	});

	let offsetHeader = headerSize && headerSize.height * -1;

	useEffect(() => {
		setCustomProperty("--headerH", `${headerSize ? headerSize.height : 0}px`);
	});

	return (
		<header ref={headerRef} data-nav-active={navOpen}>
			<h1>Kate Jackling</h1>
			<button onClick={() => toggleNav(!navOpen)}>{navOpen ? "Close" : "Menu"}</button>
			<nav>
				<ul className={sectionActive ? "sections--active" : ""}>
					<li className={sectionActive === "stilllife" ? "section--active" : ""}>
						<Link
							to="stilllife"
							offset={offsetHeader}
							spy={true}
							smooth={true}
							duration={500}
						>
							Stilllife
						</Link>
					</li>
					<li className={sectionActive === "commercial" ? "section--active" : ""}>
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
					<li className={sectionActive === "film" ? "section--active" : ""}>
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
					<li className={sectionActive === "info" ? "section--active" : ""}>
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

				nav ul li {
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

					nav ul.sections--active li:not(.section--active) {
						color: rgba(0, 0, 0, 0.5);
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
