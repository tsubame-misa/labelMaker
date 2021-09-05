import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonItemSliding,
  IonItem,
  IonToolbar,
  IonItemOption,
  IonItemOptions,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
} from "@ionic/react";

import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";

import firebase from "../config";

const ShowList = () => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ id: null, name: "" }]);
  const [labelName, setLabelName] = useState();
  const [data, setData] = useState(null);

  useIonViewWillEnter(() => {
    try {
      const db = firebase.firestore();
      db.collection("/users")
        .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const data = doc.data().data;
            console.log(doc.data().data);
            setData(data);
            for (const item of data) {
              if (item.id === id) {
                setProcrams(item.i_list);
                setLabelName(item.label);
              }
            }
          } else {
            console.log("No user");
          }
        })
        .catch(function (error) {
          console.log("Error : ", error);
        });
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    }
  }, [programs]);

  function delItem(key) {
    const newPrograms = programs.filter((_, i) => i !== key);
    setProcrams(newPrograms);
    const newObj = { id: id, label: labelName, i_list: newPrograms };
    const newData = data.map((item) => {
      if (item.id === id) {
        return newObj;
      } else {
        return item;
      }
    });

    try {
      const db = firebase.firestore();
      db.collection("users")
        .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
        .set({
          data: newData,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    }
  }

  if (programs === undefined) {
    return <div>loading...</div>;
  }
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar class="Header">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="戻る" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton routerLink={`/makeList/${id}`}>編集</IonButton>
              <IonButton expand="block" routerLink={`/list/${id}/qrcode`}>
                QRコード
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar class="Label">
            <IonItem lines="none">{labelName}</IonItem>
          </IonToolbar>
        </IonHeader>

        {programs?.map((item, key) => {
          return (
            <IonItemSliding key={item.id}>
              <IonItem>{item.name}</IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => delItem(key)}>
                  削除
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default ShowList;
