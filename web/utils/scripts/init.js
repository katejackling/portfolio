import { setCustomProperty } from "./helpers.js";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Detection */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

window.addEventListener(
	"touchstart",
	function onFirstTouch() {
		document.documentElement.classList.add("is--touch");
		window.removeEventListener("touchstart", onFirstTouch, false);
	},
	false
);

if (navigator.userAgent.indexOf("Edge") >= 0) {
	document.documentElement.classList.add("is--edge");
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Normalize VH */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function setVH() {
	setCustomProperty("--vH", `${window.innerHeight * 0.01}px`);
}

setVH();

window.addEventListener("resize", setVH);
