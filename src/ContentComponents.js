/* global chrome */
import React, { useEffect, useState, createElement } from "react";
import ReactDOM from "react-dom";
import { addANote, buttonsBarClassName } from "./constants";
import styled from "styled-components";
import { Logo } from "./Logo";
import "./App.css";

import { ShadowRoot } from "./ShadowRoot";

const ContentComponents = () => {
  useEffect(() => {
    // Render the logo
    const buttonsBarEl =
      document.getElementsByClassName(buttonsBarClassName)[0];
    const mounterElement = document.createElement("div");
    buttonsBarEl.appendChild(mounterElement);
    ReactDOM.render(<Logo>B</Logo>, mounterElement);
  }, []);

  useEffect(() => {
    // Change the collor and text of the Add a Note button
    const addANoteButton = document.getElementsByClassName(addANote)[0];
    addANoteButton.style.backgroundColor = "red";
    addANoteButton.style.color = "white";
    addANoteButton.innerText = "Configure text";
  }, []);

  return <ShadowRoot></ShadowRoot>;
};

export default ContentComponents;
