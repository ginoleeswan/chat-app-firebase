import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

function ChatMessage(props) {
  const auth = firebase.auth();

  const { text, uid, photoURL, createdAt, displayName } = props.message;

  const time =
    createdAt &&
    createdAt
      .toDate()
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL ||
          "https://img.icons8.com/material-rounded/96/000000/user-male-circle.png"
        }
      />
      <div>
        <p>{text}</p>
        <span>
          {displayName} {time}
        </span>
      </div>
    </div>
  );
}

export default ChatMessage;
