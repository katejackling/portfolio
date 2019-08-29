import { useState, useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSlide } from "../utils/redux/actions";
import useWindowSize from "../utils/hooks/useWindowSize";
import { capitalize } from "../scripts/utils";

import * as ViewerSections from "./viewer";

function ProjectViewer(props) {
	const { content, clickEnabled, slideIndex, setSlide } = props;

	let resolveSections = section => {
		// eslint-disable-next-line import/namespace
		const Section = ViewerSections[capitalize(section._type)];
		if (Section) {
			return Section;
		}
		console.error("Cant find section", section); // eslint-disable-line no-console
		return null;
	};

	console.log(props);

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
						//style={{ pointerEvents: clickEnabled ? "auto" : "none" }}
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

const mapStateToProps = state => ({
	slideIndex: state.viewer.slideIndex
});

const mapDispatchToProps = dispatch => bindActionCreators({ setSlide }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectViewer);
