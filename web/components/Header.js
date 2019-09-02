import { useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleNav } from "../utils/redux/actions";
// import useDimensions from "react-use-dimensions";
import useDimensions from "../utils/hooks/useDimensions";

import { useSpring, animated, interpolate, config } from "react-spring";
import { Link } from "react-scroll";

function Header(props) {
	const { toggleNav, navOpen } = props,
		[headerRef, headerSize] = useDimensions(),
		offsetHeader = headerSize.height * -1;

	return (
		<header ref={headerRef} data-nav-active={navOpen}>
			<h1>Kate Jackling</h1>
			<button onClick={() => toggleNav(!navOpen)}>{navOpen ? "Close" : "Menu"}</button>
			<nav>
				<ul>
					<li>
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
					<li>
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
					<li>
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
					<li>
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

					nav ul li:not(:last-child)::after {
						content: ", ";
						margin-right: 0.25em;
					}
				}
			`}</style>
		</header>
	);
}

const mapStateToProps = state => ({
	navOpen: state.nav.navOpen
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleNav }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
