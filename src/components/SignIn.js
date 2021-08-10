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

export default SignIn;
