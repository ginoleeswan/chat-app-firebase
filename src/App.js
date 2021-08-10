import React, { useRef, useState } from "react";
import "./App.css";

import { IoChatbubbles } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import Div100vh from "react-div-100vh";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
// import SignIn from "./components/SignIn";

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

  const SignOut = () => {
    return (
      auth.currentUser && (
        <button className="signout__btn" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      )
    );
  };

  // if (initializing) return "Loading...";

  return (
    <Div100vh>
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
    </Div100vh>
  );
}

export default App;
