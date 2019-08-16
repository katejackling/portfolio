import { setCustomProperty } from "./utils.js";

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Set Header Height */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function setHeaderH() {
  let HH = document.querySelectorAll("header")[0].clientHeight;
  setCustomProperty("--headerH", `${HH}px`);
}

setHeaderH();
window.addEventListener("resize", setHeaderH);
