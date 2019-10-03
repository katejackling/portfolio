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

console.log("detect");
