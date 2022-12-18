/* global chrome */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

import { localMode } from "./constants";
import { ShadowRoot } from "./ShadowRoot";

// Orange circle with letter B in it
export const Logo = styled.div`
  background: #ff8c00;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  z-index: 2;
`;
