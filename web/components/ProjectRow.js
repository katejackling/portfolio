import client from "../client";
import Img from "../components/Img";
import { withRouter } from "next/router";
import styles from "./ProjectRow.module.css";
// import { TweenMax, Draggable } from "gsap/all";

console.log(styles);

class ProjectRow extends React.Component {
  render() {
    const content = this.props.content;

    return (
      <ul id="test" className={styles.ok}>
        {content.map(({ _key, alt = "", asset = [] }) => (
          <li key={_key}>
            <Img alt={alt} asset={asset} />
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    const GSAP = require("gsap/all");
    const { TweenMax, TimelineLite, Power4, Draggable } = GSAP;
    Draggable.create("#test", {
      type: "scrollLeft",
      edgeResistance: 0.8,
      dragResistance: 0.05,
      throwProps: true,
      lockAxis: true,
      dragClickables: true
    });
  }
}

export default ProjectRow;
