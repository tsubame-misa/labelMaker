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
import { useState } from "react";
import { useParams } from "react-router";

const MakeQRcode = () => {
  const { id } = useParams();
  const [labelName, setLabelName] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [url, setUrl] = useState(null);

  useIonViewWillEnter(() => {
    (async () => {
      const getData = (await JSON.parse(localStorage.getItem("data"))) || [
        { id: null, name: "" },
      ];
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`
      );
      setUrl(response.url);
      for (const item of getData) {
        if (item.id === id) {
          setLabelName(item.label);
          setShowLoading(false);
        }
      }
    })();
  }, [labelName]);

  return (
    <IonPage>
      <IonHeader className="no-print">
        <IonToolbar class="Header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="戻る" />
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="QRcode">
          <div className="test">
            <img src={url} alt="" />
            <p className="test2">{labelName}</p>
          </div>
        </div>
      </IonContent>
      <IonLoading isOpen={showLoading} />
    </IonPage>
  );
};
export default MakeQRcode;
