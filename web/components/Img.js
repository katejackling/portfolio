import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

class Img extends React.Component {
	state = { dimensions: [] };

	componentDidMount() {
		return client
			.fetch(`*[_id == "${this.props.asset._ref}"][0].metadata.dimensions`)
			.then(dimensions => {
				this.setState({ dimensions: dimensions });
			});
	}

	render() {
		const { aspectRatio = "", height = "", width = "" } = this.state.dimensions;
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
		const { alt, asset, fit } = this.props;

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

		//src={`data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'  width%3D'${width}' height%3D'${height}' viewBox%3D'0 0 ${width} ${height}'%2F%3E"`}
		const placeholderSrc = (width, height) =>
			`data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

		return (
			<>
				<img
					draggable="false"
					className="lazyload"
					src={placeholderSrc(width, height)}
					width={width}
					// src={builder
					// 	.image(asset)
					// 	.auto("format")
					// 	.width(width / 100)
					// 	.height(height / 100)
					// 	.quality(10)
					// 	.blur(50)
					// 	.url()}
					data-srcset={srcSet}
					sizes="auto"
					data-orientation={aspectRatio < 1 ? "portrait" : "landscape"}
					style={{ "--imgRatio": aspectRatio, "--objFit": objFit }}
					alt={alt}
				/>
				<style jsx global>{`
					img {
						opacity: 0;
						filter: blur(5px);
						transition: 1s filter 400ms, opacity 1s;
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
}

export default Img;
