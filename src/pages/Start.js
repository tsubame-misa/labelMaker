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
  IonAlert,
  useIonViewWillEnter,
  IonImg,
} from "@ionic/react";
import { useState } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import "../pages/Home.css";
import "firebase/auth";
import "firebase/firestore";
import icon from "../images/icon.png";

const Setting = ({ history }) => {
  const [user, setUser] = useState(null);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);

  const handleSubmit = (event) => {
    //ver8
    firebase
      .auth()
      .signInWithEmailAndPassword(event.email, event.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        history.push("/home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err", error);
        setShowAlert3(true);
      });
  };

  const registration = (event) => {
    console.log("in signup");
    firebase
      .auth()
      .createUserWithEmailAndPassword(event.email, event.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        history.push("/home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err");
        setShowAlert4(true);
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
        <IonImg src={icon} />
        <IonList>
          <IonButton onClick={() => setShowAlert1(true)} expand="block">
            Login
          </IonButton>
          <IonButton onClick={() => setShowAlert2(true)} expand="block">
            SignUp
          </IonButton>
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass="my-custom-class"
        header={"ログイン"}
        inputs={[
          {
            name: "email",
            type: "email",
            placeholder: "メールアドレス",
          },
          {
            name: "password",
            type: "password",
            placeholder: "パスワード",
            cssClass: "specialClass",
            attributes: {
              inputmode: "decimal",
            },
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (e) => {
              console.log("Confirm Cancel");
            },
          },
          {
            text: "OK",
            handler: handleSubmit,
          },
        ]}
      />
      <IonAlert
        isOpen={showAlert2}
        onDidDismiss={() => setShowAlert2(false)}
        cssClass="my-custom-class"
        header={"サインアップ"}
        inputs={[
          {
            name: "email",
            type: "email",
            placeholder: "メールアドレス",
          },
          {
            name: "password",
            type: "password",
            placeholder: "パスワード",
            cssClass: "specialClass",
            attributes: {
              inputmode: "decimal",
            },
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (e) => {
              console.log("Confirm Cancel");
            },
          },
          {
            text: "OK",
            handler: registration,
          },
        ]}
      />
      <IonAlert
        isOpen={showAlert3}
        onDidDismiss={() => setShowAlert3(false)}
        cssClass="my-custom-class"
        header={"ログインに失敗しました"}
        message={"正しいメールアドレスとパスワードを入力してください"}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showAlert4}
        onDidDismiss={() => setShowAlert4(false)}
        cssClass="my-custom-class"
        header={"サインアップに失敗しました"}
        message={"正しいメールアドレスとパスワードを入力してください"}
        buttons={["OK"]}
      />
    </IonPage>
  );
};

export default Setting;
