import Link from "next/link";
import client from "../client";
import Intro from "./Intro";
import useClientFetch from "../utils/hooks/useClientFetch";

function IntroContainer(props) {
	const data = useClientFetch(
		`*[_id == "home"]{intro}[0]{intro, "references": intro[].reference->, "references_left": intro[].reference_left->, "references_right": intro[].reference_right->}`
	);

	if (!data) {
		return null;
	}

	const { intro, references, references_left, references_right } = data;

	return <Intro content={intro} references={{ references, references_left, references_right }} />;
}

export default IntroContainer;
