import React, { useRef, useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

function ChatRoom() {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const messagesEndRef = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const viewBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName, email } = auth.currentUser;

    if (formValue != "") {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
        email,
      });
    }

    setFormValue("");

    messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(viewBottom, [messages]);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={messagesEndRef}></div>
      </main>

      <form onSubmit={sendMessage}>
        <div className="app__form__container">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="send__button" type="submit" disabled={!formValue}>
            <FiSend className="send__button__icon" />
          </button>
        </div>
      </form>
    </>
  );
}

export default ChatRoom;
