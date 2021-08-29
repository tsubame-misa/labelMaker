import firebase from "../config";
import { Link } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
//import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
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
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err", error);
      });
  };
  console.log("here");

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
