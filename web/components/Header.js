import Link from "next/link";

class Header extends React.Component {
	state = { navActive: false };

	toggleMenu = () => {
		this.setState(state => ({
			navActive: !state.navActive
		}));
	};
	render() {
		return (
			<header data-nav-active={this.state.navActive}>
				<h1>Kate Jackling</h1>
				<button onClick={this.toggleMenu}>{this.state.navActive ? "Close" : "Menu"}</button>
				<nav>
					<ul>
						<li>Stilllife</li>
						<li>Commercial</li>
						<li>Film</li>
						<li>Info</li>
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
}

export default Header;
