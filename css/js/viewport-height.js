import {
  throttle
} from "./main-transition.js";
window.addEventListener('resize', onResize)
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function onResize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
onResize = throttle(onResize, 500);