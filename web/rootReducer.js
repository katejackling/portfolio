import { combineReducers } from "redux";

import { nav, viewer } from "./utils/redux/reducer";
// import movies from "./movies/reducer";

const rootReducer = combineReducers({
	nav,
	viewer
});

export default rootReducer;
