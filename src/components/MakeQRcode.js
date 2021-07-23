import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonLoading,
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
  const [showLoading, setShowLoading] = useState(true);

  setTimeout(() => {
    setShowLoading(false);
  }, 2000);

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data")) || [{ name: "" }];
    for (const item of getData) {
      if (item.id === id) {
        setLabelName(item.label);
      }
    }
  }, [labelName]);

  console.log(labelName);
  return (
    <IonPage>
      <IonHeader className="no-print">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="戻る" />
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={1200}
        />
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
