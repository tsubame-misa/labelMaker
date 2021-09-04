import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTitle,
  IonList,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import "../pages/Home.css";
import "firebase/auth";
import "firebase/firestore";

const Setting = () => {
  const [user, setUser] = useState(null);

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
        //history.push("/home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err", error);
      });
  };

  useIonViewWillEnter(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonButton
            slot="end"
            expand="full"
            color="light"
            routerLink="/setting/guide"
          >
            利用ガイド
          </IonButton>
          {/*loginが表示されるのはありえん */}
          {user == null ? (
            <IonButton
              slot="end"
              expand="full"
              color="light"
              routerLink="/login"
            >
              Login
            </IonButton>
          ) : (
            <IonButton
              slot="end"
              expand="full"
              color="light"
              onClick={() => logout()}
            >
              Logout
            </IonButton>
          )}
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
