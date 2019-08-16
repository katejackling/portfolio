import { useContext } from "react";
import { Context } from "./Context";

export default function Test() {
  // [A]
  let { state, dispatch } = useContext(Context);

  // [B]
  React.useEffect(() => {
    document.body.style.backgroundColor = state.currentColor;
  }, [state.currentColor]);

  // [C]
  let inc = () => dispatch({ type: "increment" });
  let dec = () => dispatch({ type: "decrement" });
  let reset = () => dispatch({ type: "reset" });
  let setColor = color => () => dispatch({ type: "set-color", payload: color });

  let setSlide = slideIndex => () => dispatch({ type: "set-slide", payload: slideIndex });

  //console.log(state.slideIndex);

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <p>
          Current color is: <b>{state.currentColor}</b>
        </p>
        <p>
          Current count: <b>{state.count}</b>
        </p>
      </div>
      <div style={{ paddingTop: 40 }}>
        <p>Count controls:</p>
        <button onClick={inc}>Increment!</button>
        <button onClick={dec}>Decrement!</button>
      </div>
      <div>
        <p>Color controls:</p>
        <button onClick={setColor("green")}>Change to green!</button>
        <button onClick={setColor("papayawhip")}>Change to papayawhip!</button>
        <button onClick={setSlide(2)}>Update Slide</button>
      </div>
      <div>
        <p>Reset changes:</p>
        <button onClick={reset}>Reset!</button>
      </div>
    </React.Fragment>
  );
}
