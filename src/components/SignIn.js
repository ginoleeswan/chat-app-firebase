import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const SignIn = () => {
  const auth = firebase.auth();
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

  const signInWithFacebook = async () => {
    // retrieve Google provider object
    const provider = new firebase.auth.FacebookAuthProvider();
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
    <>
      <div className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </div>
      <br />

      <div className="login-with-facebook-btn" onClick={signInWithFacebook}>
        Sign in with Facebook
      </div>
    </>
  );
};

export default SignIn;
