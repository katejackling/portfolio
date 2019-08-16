import { throws } from "assert";
import { useContext } from "react";
import { Context } from "./Context";

import { capitalize } from "../scripts/utils";
import * as ViewerSections from "./viewer";

function ProjectViewer(props) {
  let resolveSections = section => {
    // eslint-disable-next-line import/namespace
    const Section = ViewerSections[capitalize(section._type)];

    if (Section) {
      return Section;
    }

    console.error("Cant find section", section); // eslint-disable-line no-console
    return null;
  };

  let changeSlides = index => () => {
    let indexNew = index === props.content.length - 1 ? 0 : index + 1;
    dispatch({ type: "set-slide", payload: indexNew });
  };

  React.useEffect(() => {
    return () => {
      console.log("will unmount");
    };
  }, []);

  const { content, id } = props;

  let { state, dispatch } = useContext(Context);

  return (
    <section className="project__viewer">
      <ul>
        {content.map((section, i) => {
          const ViewerSection = resolveSections(section);
          if (!ViewerSection) {
            return <div>Missing section {section._type}</div>;
          }
          return (
            <li
              key={section._key}
              className={state.slideIndex === i ? "visible" : "hidden"}
              // key={_key}
              onClick={changeSlides(i)}
            >
              <ViewerSection {...section} />
            </li>
          );
        })}
      </ul>
      <style jsx global>{`
        .project__viewer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100 * var(--vH));
          background: white;
          z-index: 8;
        }
        .project__viewer ul {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .project__viewer li {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .project__viewer li.hidden {
          visibility: hidden;
        }

        .project__viewer figure,
        .project__viewer img,
        .project__viewer .player__wrapper,
        .project__viewer video {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <style jsx>{`
        .project__viewer {
          display: ${state.viewerID && id === state.viewerID ? "block" : "none"};
        }
      `}</style>
    </section>
  );
}

export default ProjectViewer;
