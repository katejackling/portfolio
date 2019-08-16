import client from "../client";
import Media from "./Media";

import { useContext } from "react";
import { Context } from "./Context";

function ProjectRow(props) {
  let setSlide = (slideIndex, viewerID) => () => {
    dispatch({ type: "set-slide", payload: slideIndex });
    dispatch({ type: "set-viewer", payload: viewerID });
    dispatch({ type: "increment" });
  };

  let { state, dispatch } = useContext(Context);
  const { content, id, total } = props;

  return (
    <ul>
      {content.map(({ _key, alt = "", media = {} }, i) => (
        <li key={_key} onClick={setSlide(i, id)}>
          <figure>
            <Media
              asset={media.condition ? media.video.asset : media.image.asset}
              type={media.condition ? "video" : "image"}
            />
            <figcaption>
              {i + 1}/{total}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export default ProjectRow;
