import firebase from "../config";
import { Link } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
//import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const Login = ({ history }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    //ver8
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("ok");
        history.push("/home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err", error);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit} method="post">
          <div>
            <label>メールアドレス</label>
            <input name="email" type="email" placeholder="email" />
          </div>
          <div>
            <label>パスワード</label>
            <input name="password" type="password" placeholder="password" />
          </div>
          <div>
            <button>ログイン</button>
          </div>
          <div>
            ユーザ登録は<Link to={"/signup"}>こちら</Link>から
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
/*
//import React from "react";
import firebase from "../config";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
//import firebaseui from "firebaseui";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    /*firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
};

const SignInScreen = (props) => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
export default SignInScreen;
*/
