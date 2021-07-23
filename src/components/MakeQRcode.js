import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
} from "@ionic/react";
import "../pages/Home.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import img from "./panda.PNG";
import img2 from "../images/P1.png";
import QRCode from "qrcode.react";

const MakeQRcode = () => {
  const { id } = useParams();
  const [labelName, setLabelName] = useState();

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data")) || [{ name: "" }];
    for (const item of getData) {
      if (item.id === id) {
        setLabelName(item.label);
      }
    }
  }, [labelName]);
  return (
    <IonPage>
      <IonHeader className="no-print">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary" defaultHref="/home" text="戻る" />
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="QRcode">
          <div className="test">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`}
              alt=""
            />
            <p className="test2">{labelName}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default MakeQRcode;
