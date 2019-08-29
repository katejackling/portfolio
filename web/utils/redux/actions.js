import client from "../../client";

export const ENABLE_VIEWER = "ENABLE_VIEWER";
export const SET_SLIDE = "SET_SLIDE";
export const RESET_VIEWER = "RESET_VIEWER";
export const TOGGLE_NAV = "TOGGLE_NAV";

export function enableViewer(viewerID, slideIndex) {
	return async function(dispatch) {
		const res = await client.fetch(`*[_id == "${viewerID}"]`);
		const content = res[0].content;
		console.log(content);
		return dispatch({
			type: "ENABLE_VIEWER",
			viewerContent: content,
			viewerID,
			slideIndex
		});
	};
}

export function setSlide(slideIndex) {
	return {
		type: "SET_SLIDE",
		slideIndex
	};
}

export function resetViewer() {
	return {
		type: "RESET_VIEWER"
	};
}

export function toggleNav(navOpen) {
	return {
		type: "TOGGLE_NAV",
		navOpen
	};
}
