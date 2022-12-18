/* global chrome */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { offwhite, localMode, africanviolet, darkbluegray } from "./constants";

// const sampleNotesShape = { "someUrl": [{ note: "some text", x: 100, y: 100 }] };

const ListNoMarker = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UrlP = styled.p`
  background: papayawhip;
  margin: 0.5em;
  padding: 0.5em;
  overflow: scroll;
`;

const UrlEntry = ({ entry }) => {
  const [open, setOpen] = useState(false);
  const url = entry[0];
  const notes = entry[1];

  return (
    <li onClick={() => setOpen(!open)}>
      <UrlP>
        <b>{url}</b>
      </UrlP>
      {notes && (
        <ul style={open ? { display: "inherit" } : { display: "none" }}>
          {notes.map((note) => (
            <li>{note.note}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

const TagButton = styled.button`
  background: ${darkbluegray};
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
`;

export const PopupComponent = () => {
  const [notes, setNotes] = useState([]);

  // get notes to display in popup.html
  useEffect(() => {
    if (!localMode) {
      chrome.storage.local.get((items) => {
        setNotes(items);
      });
    }
  }, []);

  return (
    <>
      <h3>Hello from sticky notes!</h3>
      <TagButton>
        <button>all</button>
        <button>unsorted</button>
        <button>sorted</button>
      </TagButton>

      <h4>Your notes:</h4>
      {notes && (
        <ListNoMarker>
          {Object.entries(notes).map((entry) => (
            <UrlEntry entry={entry} />
          ))}
        </ListNoMarker>
      )}
    </>
  );
};
