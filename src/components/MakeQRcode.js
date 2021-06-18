import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
  IonTitle,
} from "@ionic/react";
import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";

const MakeQRcode = () => {
  const { id } = useParams();
  const [labelName, setLabelName] = useState();

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data")) || [{ name: "" }];
    for (const item of getData) {
      if (item.id === Number(id)) {
        setLabelName(item.label);
      }
    }
  }, [labelName]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary" defaultHref="/home" />
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonTitle>LableMaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/list/${id}`}
            alt="QRcode"
          ></img>
          <p>{labelName}</p>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default MakeQRcode;
