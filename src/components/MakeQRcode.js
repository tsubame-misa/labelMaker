import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonItemSliding,
  IonInput,
  IonItem,
  IonToolbar,
  IonItemOption,
  IonItemOptions,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";
import { addOutline } from "ionicons/icons";

const MakeQRcode = () => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ name: "" }]);
  const [labelName, setLabelName] = useState();
  const [data, setData] = useState([]);

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data")) || [{ name: "" }];
    const l = getData.find((item) => item.id === id);
    for (const item of getData) {
      console.log(item.id, id);

      if (item.id === Number(id)) {
        setLabelName(item.label);
      }
    }
    console.log(labelName);
    setData(getData);
  }, [data]);
  console.log(data);

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
        </div>
      </IonContent>
    </IonPage>
  );
};
export default MakeQRcode;
