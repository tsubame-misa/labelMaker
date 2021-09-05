import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonLoading,
  IonButton,
  useIonViewWillEnter,
} from "@ionic/react";
import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";
import firebase from "../config";

const MakeQRcode = () => {
  const { id } = useParams();
  const [labelName, setLabelName] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [url, setUrl] = useState(null);

  useIonViewWillEnter(() => {
    (async () => {
      try {
        const db = firebase.firestore();
        db.collection("/users")
          .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
          .get()
          .then(function (doc) {
            if (doc.exists) {
              const data = doc.data().data;
              for (const item of data) {
                if (item.id === id) {
                  setLabelName(item.label);
                  //setShowLoading(false);
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
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`
      );
      setUrl(response.url);
      setShowLoading(false);
    })();
  }, [labelName]);
  return (
    <IonPage>
      <IonHeader className="no-print">
        <IonToolbar class="Header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="戻る" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                window.print();
              }}
            >
              印刷
            </IonButton>
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!showLoading ? (
          <div className="QRcode">
            <div className="test">
              <img src={url} alt="QRコード" />
              <p className="QRlabel">{labelName}</p>
            </div>
          </div>
        ) : (
          []
        )}
      </IonContent>
      <IonLoading isOpen={showLoading} />
    </IonPage>
  );
};
export default MakeQRcode;
