import { ReactDOM } from "react";

export const mountElementToDiv = (element, div) => {
  const mountNode = document.createElement("div");
  mountNode.id = "mountNode";
  div.getElementsByClassName("pv-top-card-v2-ctas")[0].appendChild(mountNode);
  ReactDOM.render(element, mountNode);
};

export const mountToElement = (element, div) => {
  const mountNode = document.createElement("div");
  mountNode.id = "mountNode";
  div.appendChild(mountNode);
  ReactDOM.render(element, mountNode);
};

export const mountElement = (element) => {
  const insertionPoint = document.createElement("div");
  insertionPoint.id = "insertion-point";
  document.body.parentNode.insertBefore(insertionPoint, document.body);
  ReactDOM.render(element, insertionPoint);
};
