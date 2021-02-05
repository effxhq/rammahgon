import React from "react";
import Markdown from "react-markdown";
import Link from "./link";

function Contact(type) {
  const contactDesc = `Provide contact information for a particular ${type}`;
  const emailDesc = `Email address for who to contact about the ${type}`;
  const oncallDesc = `Link to the on-call rotation for the ${type}`;
  const chatDesc = `Link to the best chat room to discuss issues with the ${type}`;
  const issueDesc = `Where to file bugs for the ${type}`;

  return {
    name: "contact",
    type: "object",
    content: (
      <>
        <Markdown source={contactDesc} />
      </>
    ),
    children: [
      {
        name: "email",
        type: "string",
        content: (
          <>
            <Markdown source={emailDesc} />
          </>
        ),
      },
      {
        name: "onCall",
        type: "link object",
        content: (
          <>
            <Markdown source={oncallDesc} />
          </>
        ),
        children: Link,
      },
      {
        name: "chat",
        type: "link object",
        content: (
          <>
            <Markdown source={chatDesc} />
          </>
        ),
        children: Link,
      },
      {
        name: "issueTracker",
        type: "link object",
        content: (
          <>
            <Markdown source={issueDesc} />
          </>
        ),
        children: Link,
      },
    ],
  };
}

export default Contact;
