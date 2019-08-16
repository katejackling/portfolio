import { useState, createContext } from "react";

let Context = createContext();

let initialState = {
  count: 10,
  currentColor: "#bada55",
  viewerID: null,
  slideIndex: 0
};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "set-color":
      return { ...state, currentColor: action.payload };
    case "toggle-viewer":
      return { ...state, viewerOpen: action.payload };
    case "set-viewer":
      return { ...state, viewerID: action.payload };
    case "set-slide":
      return { ...state, slideIndex: action.payload };
  }
};

function Provider(props) {
  // [A]
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  // [B]
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

let Consumer = Context.Consumer;

// [C]
export { Context, Provider, Consumer };
