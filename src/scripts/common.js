"use strict";

function createSvg(size, colour, svgPath) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.setAttribute("width", `${size}px`);
  svg.setAttribute("height", `${size}px`);
  svg.setAttribute("viewBox", "0 0 24 24");
  path.setAttribute("d", svgPath);
  path.setAttribute("fill", colour);
  svg.appendChild(path);

  return svg
}

function sidebarButtonSelectHandler(button) {
  document.querySelector(".sidebar").querySelector(".selected").classList.remove("selected");
  button.classList.add("selected");
}

export { createSvg, sidebarButtonSelectHandler }