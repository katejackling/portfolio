// import client from "../client";
// import { withRouter } from "next/router";
// import Media from "./Media";
// import ProjectRow from "../components/ProjectRow";

// class ProjectRowContainer extends React.Component {
// 	state = {
// 		width: 0,
// 		height: 0,
// 		enableSlider: false
// 	};

// 	sliderInstance = null;

// 	componentDidMount() {
// 		this.updateDimensions();
// 		window.addEventListener("resize", this.updateDimensions);
// 		document.addEventListener("lazyloaded", this.updateDimensions);

// 		const GSAP = require("gsap/all");
// 		require("../scripts/ThrowPropsPlugin.js");
// 		const { TweenMax, TimelineLite, Power4, Draggable } = GSAP;
// 		const plugins = [ThrowPropsPlugin];

// 		this.sliderInstance = Draggable.create(this.sliderRef, {
// 			type: "scrollLeft",
// 			edgeResistance: 0.8,
// 			dragResistance: 0.05,
// 			throwProps: true,
// 			lockAxis: true,
// 			dragClickables: true
// 		})[0];
// 	}

// 	componentDidUpdate(prevProps, prevState, snapshot) {
// 		if (prevState && this.state.width !== prevState.width) {
// 			if (this.sliderInstance) {
// 				this.sliderInstance.enabled(this.state.enableSlider);
// 			}
// 		}
// 	}

// 	componentWillUnmount() {
// 		window.removeEventListener("resize", this.updateDimensions);
// 		document.removeEventListener("lazyloaded", this.updateDimensions);
// 	}

// 	updateDimensions = () => {
// 		const w = window,
// 			d = document,
// 			documentElement = d.documentElement,
// 			body = d.getElementsByTagName("body")[0],
// 			width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
// 			height = w.innerHeight || documentElement.clientHeight || body.clientHeight,
// 			sliderItems = this.sliderRef.querySelectorAll("li");

// 		let sliderItemsWidth = 0;

// 		for (let i = 0; i < sliderItems.length; i++) {
// 			const sliderItemBCR = sliderItems[i].getBoundingClientRect();
// 			//console.log(sliderItemBCR, sliderItemBCR.width);
// 			sliderItemsWidth += sliderItemBCR.width;
// 		}

// 		const enableSlider = sliderItemsWidth > width ? true : false;

// 		// console.log(sliderItems, sliderItemsWidth, enableSlider);

// 		this.setState({ width, height, enableSlider });
// 		if (this.sliderInstance) {
// 			this.sliderInstance.enabled(this.state.enableSlider);
// 		}
// 	};

// 	render() {
// 		const { content, id, total } = this.props;
// 		console.log(this.props.content);

// 		return (
// 			<div className="slider" ref={div => (this.sliderRef = div)}>
// 				<ProjectRow content={content} id={id} total={total} />

// 				<style jsx global>{`
// 					.slider {
// 						width: 100%;
// 						overflow-x: auto;
// 						overflow-y: hidden;
// 					}
// 					.slider ul {
// 						display: flex;
// 						justify-content: space-between;
// 						padding: calc(var(--marginOuter) / 2);
// 					}

// 					.slider li {
// 						padding: calc(var(--marginOuter) / 2);
// 					}

// 					.slider li figure {
// 						position: relative;
// 					}

// 					.slider img,
// 					.slider video {
// 						height: 10rem !important;
// 						width: auto !important;
// 					}

// 					@media screen and (max-width: 639px) {
// 					}

// 					@media screen and (min-width: 640px) {
// 						.slider li figure {
// 							padding: 0 calc(2rem - var(--marginOuter) / 2) 0 0;
// 							background: red;
// 						}

// 						.slider ul {
// 							counter-reset: section;
// 						}

// 						.slider li {
// 							counter-increment: section;
// 						}

// 						.slider li figure figcaption {
// 							position: absolute;
// 							top: 0;
// 							left: 100%;
// 							white-space: nowrap;
// 							transform: rotate(-90deg) translate(-100%, -100%);
// 							transform-origin: top left;
// 							padding: 0.5rem 0 0 0;
// 						}
// 					}
// 				`}</style>
// 				<style jsx>{`
// 					.slider {
// 						${this.state.enableSlider ? "cursor: grab !important;" : ""}
// 					}

// 					.slider:active {
// 						${this.state.enableSlider
// 							? "cursor: grabbing !important; cursor: -moz-grabbing !important; cursor: -webkit-grabbing !important;"
// 							: ""}
// 					}
// 				`}</style>
// 			</div>
// 		);
// 	}

// 	//   content: counter(section) "/${total}";
// }

// export default ProjectRowContainer;
