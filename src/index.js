import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { addANote, orange } from "./constants";
import StickyNotes from "./StickyNotes";
import ContentComponents from "./ContentComponents";
import * as serviceWorker from "./serviceWorker";

import { PopupComponent } from "./PopupComponent";
import { buttonsBarClassName } from "./constants";
import { Logo } from "./Logo";

const popupRoot = document.getElementById("popup-root");

const insertionPoint = document.createElement("div");
insertionPoint.id = "insertion-point";
document.body.parentNode.insertBefore(insertionPoint, document.body);

// StickyNotes / content script
!popupRoot &&
  ReactDOM.render(
    <React.StrictMode>
      <ContentComponents />
    </React.StrictMode>,
    document.getElementById("insertion-point")
  );

// Select the node that will be observed for mutations
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed

const addANoteObserverCallback = (mutationList, observer) => {
  const addANoteButton = document.getElementsByClassName(addANote)[0];
  if (
    !!mutationList.filter(
      (mutation) =>
        mutation.type === "childList" &&
        addANoteButton.innerText === "Add a note"
    )
  ) {
    addANoteButton.innerText = "Compose Note";
    addANoteButton.style.backgroundColor = orange;
    addANoteButton.style.color = "white";
    addANoteButton.style.border = "0px";
    observer.disconnect();
  }
};
// Create an observer instance linked to the callback function
const addANoteObserver = new MutationObserver(addANoteObserverCallback);
// Start observing the target node for configured mutations
addANoteObserver.observe(targetNode, config);

// PopupComponent / popup.html
popupRoot && // to suppress minified react error 200
  ReactDOM.render(
    <React.Fragment>
      <PopupComponent />
    </React.Fragment>,
    popupRoot
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
