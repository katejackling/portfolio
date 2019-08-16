import { setCustomProperty } from "./utils.js";
import "./main.js";

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
/* Normalize viewport height */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function setVH() {
  let VH = window.innerHeight * 0.01;
  setCustomProperty("--vH", `${VH}px`);
}

setVH();
window.addEventListener("resize", setVH);
