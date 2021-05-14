import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItemSliding,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "../pages/Home.css";
import { useState } from "react";

const MakeList = () => {
  const [programName, setProgramName] = useState();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>番組を登録する</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput
            value={programName}
            placeholder="番組名"
            onIonChange={(e) => setProgramName(e.detail.value)}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
