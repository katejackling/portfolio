import { useState, useGlobal } from "reactn";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import useClientFetch from "../utils/hooks/useClientFetch";

function Img(props) {
	const { alt, asset, fit } = props,
		[mediaHover, setMediaHover] = useGlobal("mediaHover");

	const dimensions = useClientFetch(`*[_id == "${asset._ref}"][0].metadata.dimensions`);

	if (!dimensions) {
		return null;
	}

	const { aspectRatio = "", height = "", width = "" } = dimensions;
	const builder = imageUrlBuilder(client);
	const sizes = [
		120,
		240,
		360,
		480,
		600,
		840,
		1080,
		1320,
		1560,
		1800,
		2040,
		2280,
		2520,
		2760,
		3000
	];

	const objFit = fit ? fit : "none";

	const sizeURLs = sizes.map(function(size) {
		return `${builder
			.image(asset)
			.auto("format")
			.width(size)
			.fit("max")
			.url()} ${size}w`;
	});

	const srcSet = sizeURLs.reduce(function(prev, curr, i) {
		return i == 0 ? curr : prev + ", " + curr;
	}, "");

	const placeholderSrc = (width, height) =>
		`data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

	return (
		<>
			<img
				draggable="false"
				className="lazyload"
				src={placeholderSrc(width, height)}
				width={width}
				data-srcset={srcSet}
				sizes="auto"
				data-orientation={aspectRatio < 1 ? "portrait" : "landscape"}
				style={{ "--imgRatio": aspectRatio, "--objFit": objFit }}
				alt={alt}
				// onMouseOver={() => setMediaHover(true)}
				// onMouseOut={() => setMediaHover(false)}
			/>
			<style jsx global>{`
				img {
					opacity: 0;
					filter: blur(5px);
					transition: filter 1s, opacity 1s;
				}

				img.lazyloaded {
					-webkit-filter: blur(0);
					filter: blur(0);
					opacity: 1;
				}
			`}</style>
		</>
	);
}

export default Img;
