import {
  IonPage,
  IonButton,
  IonContent,
  IonList,
  IonAlert,
  useIonViewWillEnter,
  IonImg,
} from "@ionic/react";
import { useState } from "react";
import firebase from "../config";
import "./start.css";
import "firebase/auth";
import "firebase/firestore";
import icon from "../images/icon.png";
import img from "../images/OGP.png";

const Setting = ({ history }) => {
  const [user, setUser] = useState(null);

  useIonViewWillEnter(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  var provider = new firebase.auth.GoogleAuthProvider();
  const login = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.info("ok");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <IonPage>
      <IonContent className="login">
        <div class="login-page-content">
          <img src={img} alt="login page" />
          <div class="login-button">
            <IonButton color="light" onClick={() => login()}>
              Sign in with Google
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
