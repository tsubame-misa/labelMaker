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
import "../pages/Home.css";

const Setting = ({ history }) => {
  const [user, setUser] = useState(null);

  useIonViewWillEnter(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  function logout() {
    firebase.auth().signOut();
    history.push("/");
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
