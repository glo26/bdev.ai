/* global chrome */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

import { localMode } from "./constants";
import { ShadowRoot } from "./ShadowRoot";

// Selects the "More" button and overrides the style to make it orange
export const MoreButton = styled.button`
  background: #ff8c00;
  border-radius: 0.5em;
  margin: 0.5em;
  padding: 0.5em;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
`;
