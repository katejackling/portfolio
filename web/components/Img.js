import client from "../client";
import imageUrlBuilder from "@sanity/image-url";

class Img extends React.Component {
  state = { dimensions: [] };

  componentDidMount() {
    return client
      .fetch(`*[_id == "${this.props.asset._ref}"][0].metadata.dimensions`)
      .then(dimensions => {
        this.setState({ dimensions: dimensions });
      });
  }

  //   Index.getInitialProps = async () => ({
  //   about: await client.fetch(`*[_id == "about"]`)
  // });

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
    const { alt, asset } = this.props;

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

    return (
      <img
        className="lazyload"
        src={`data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'  width%3D'${width}' height%3D'${height}' viewBox%3D'0 0 ${width} ${height}'%2F%3E"`}
        data-srcset={srcSet}
        sizes="auto"
        data-orientation={aspectRatio < 1 ? "portrait" : "landscape"}
        style={{ "--imgRatio": aspectRatio }}
        alt={alt}
      />
    );
  }
}

export default Img;
