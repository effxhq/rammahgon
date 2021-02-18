import React from "react";
import Markdown from "react-markdown";

const Link = [
  {
    name: "label",
    type: "string",
    content: (
      <>
        <Markdown>
          The label is how the URL will be presented in the UI
        </Markdown>
      </>
    ),
  },
  {
    name: "url",
    type: "string",
    content: (
      <>
        <Markdown>
          The url of the for the link out. Can be an internal or public site.
        </Markdown>
      </>
    ),
  },
];

export default Link;
