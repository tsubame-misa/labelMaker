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
import { getAllData } from "../pages/service/api";
import "./QRcode.css";

const MakeQRcode = () => {
  const { id } = useParams();
  const [labelName, setLabelName] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const [isExistCd, setIsExistCd] = useState(false);

  useIonViewWillEnter(() => {
    (async () => {
      const data = await getAllData();
      for (const item of data) {
        if (item.id === id) {
          setLabelName(item.label);
          setIsExistCd(true);
          break;
          //setShowLoading(false);
        }
      }
      /*const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`
      );
      setUrl(response.url);*/
      setUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`
      );
    })();
    setShowLoading(false);
  }, [labelName]);
  return (
    <IonPage>
      <IonHeader className="no-print">
        <IonToolbar className="Header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="戻る" />
          </IonButtons>
          {isExistCd && (
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  window.print();
                }}
              >
                印刷
              </IonButton>
            </IonButtons>
          )}
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!isExistCd ? (
          <div className="no-data">データが存在しません</div>
        ) : (
          !showLoading && (
            <div className="QRcode">
              <div className="test">
                <img src={url} alt="QRコード" />
                <p className="QRlabel">{labelName}</p>
              </div>
            </div>
          )
        )}
      </IonContent>
      <IonLoading isOpen={showLoading} />
    </IonPage>
  );
};
export default MakeQRcode;
