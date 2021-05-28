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
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonItemOption,
  IonItemOptions,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "../pages/Home.css";
import { useEffect, useState } from "react";

const MakeList = () => {
  const [labelName, setLabelName] = useState();
  const [programName, setProgramName] = useState();
  const [data, setData] = useState([]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton>
                保存
          </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonInput
            value={labelName}
            placeholder="ラベル名"
            onIonChange={(e) => setLabelName(e.detail.value)}

          ></IonInput>
        </IonHeader>
        <IonItemSliding>
          <IonItem>
            <IonInput
              value={programName}
              placeholder="番組名"
              onIonChange={(e) => setProgramName(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonButtons slot="start">
            <IonButton>
              ＋
          </IonButton>
          </IonButtons>
          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => console.log('share clicked')}>削除</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        <IonButton expand="block">ラベル印刷</IonButton>
      </IonContent>
    </IonPage >
  );
};

export default MakeList;
