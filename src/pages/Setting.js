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
import { useEffect, useState } from "react";
import firebase from "../config";
import "../pages/Home.css";

const Setting = ({ history }) => {
  function logout() {
    firebase.auth().signOut();
    history.push("/");
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar class="Header">
            <IonTitle>設定</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="戻る" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonButton
            slot="end"
            expand="full"
            color="light"
            routerLink="/setting/guide"
          >
            利用ガイド
          </IonButton>
          <IonButton
            slot="end"
            expand="full"
            color="light"
            onClick={() => logout()}
          >
            Logout
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
