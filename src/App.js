import React, { useRef, useState } from "react";
import "./App.css";

import { IoChatbubbles } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDaHB6YOFKsWB1fzgwKMfrHcSDRiwFO-Ag",
  authDomain: "react-firechat-b7d2c.firebaseapp.com",
  projectId: "react-firechat-b7d2c",
  storageBucket: "react-firechat-b7d2c.appspot.com",
  messagingSenderId: "944328206553",
  appId: "1:944328206553:web:dcb88e76249e1250e576c8",
  measurementId: "G-Q5826K8MFY",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);
  const [initializing, setInitializing] = useState(true);

  const SignIn = () => {
    const signInWithGoogle = async () => {
      // retrieve Google provider object
      const provider = new firebase.auth.GoogleAuthProvider();
      // set language to default brower preference
      auth.useDeviceLanguage();
      // start sign in process
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="sign-in" onClick={signInWithGoogle}>
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text">
          <b>Sign in with Google</b>
        </p>
      </div>
    );
  };

  const SignOut = () => {
    return (
      auth.currentUser && (
        <button className="signout__btn" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      )
    );
  };

  function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });

    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
      e.preventDefault();

      const { uid, photoURL } = auth.currentUser;

      if (formValue != "") {
        await messagesRef.add({
          text: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
        });
      }

      setFormValue("");

      dummy.current.scrollIntoView({ behaviour: "smooth" });
    };

    return (
      <>
        <main>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <div ref={dummy}></div>
        </main>

        <form onSubmit={sendMessage}>
          <div className="app__form__container">
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              className="send__button"
              type="submit"
              disabled={!formValue}
            >
              <FiSend className="send__button__icon" />
            </button>
          </div>
        </form>
      </>
    );
  }

  function ChatMessage(props) {
    const { text, uid, photoURL, createdAt } = props.message;

    const time = createdAt
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
          <span>{time}</span>
        </div>
      </div>
    );
  }

  // if (initializing) return "Loading...";

  return (
    <div className="App">
      <header>
        <h1 className="app__title">
          FireChat
          <IoChatbubbles className="app__logo" />
        </h1>

        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
