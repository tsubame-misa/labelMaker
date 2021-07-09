import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
  IonTitle,
  IonImg,
} from "@ionic/react";
import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";
import img from "./panda.PNG";

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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary" defaultHref="/home" />
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonTitle>LableMaker QRコード</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="QRcode">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`}
            alt="QRcode"
          ></img>
          <p
            className="labelName"
            style={{ fontSize: "1.5rem", margin: "3px" }}
          >
            {labelName}
          </p>
        </div>
        {/*} <IonImg src={img}></IonImg>*/}
      </IonContent>
    </IonPage>
  );
};
export default MakeQRcode;
