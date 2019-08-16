import Link from "next/link";
import client from "../client";
import IntroContent from "./IntroContent";

class Intro extends React.Component {
  //state = { content: [] };

  componentDidMount() {
    return client
      .fetch(`*[_id == "intro"]{content}[0]{content, "references": content[].reference->}`)
      .then(query => {
        this.setState({ content: query.content, references: query.references });
      });
  }

  render() {
    if (!this.state) {
      return null;
    }
    return <IntroContent content={this.state.content} references={this.state.references} />;
  }
}

export default Intro;
