import { ENABLE_VIEWER, SET_SLIDE, RESET_VIEWER, TOGGLE_NAV } from "./actions";

const initialViewerState = {
	viewerOpen: false,
	viewerContent: null,
	viewerID: null,
	slideIndex: 0
};

export const viewer = function(state = initialViewerState, action) {
	const { type, viewerID, slideIndex, viewerContent } = action;
	switch (type) {
		case ENABLE_VIEWER:
			return {
				...state,
				viewerOpen: true,
				viewerContent,
				viewerID,
				slideIndex
			};
		case SET_SLIDE:
			return {
				...state,
				slideIndex
			};
		case RESET_VIEWER:
			return {
				...state,
				viewerOpen: false,
				viewerID: null,
				slideIndex: 0
			};
		default:
			return state;
	}
};

const initialNavState = {
	navOpen: false
};

export const nav = function(state = initialNavState, action) {
	const { type, navOpen } = action;
	switch (type) {
		case TOGGLE_NAV:
			return {
				...state,
				navOpen
			};
		default:
			return state;
	}
};
