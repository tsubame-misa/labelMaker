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
  const [programName, setProgramName] = useState();
  const [data, setData] = useState([]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button>
                戻る
          </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button>
                保存
          </ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-toolbar>
            <ion-title>番組名を登録する</ion-title>
          </ion-toolbar>
        </IonHeader>
        <IonItem>
          <IonInput
            value={programName}
            placeholder="番組名"
            onIonChange={(e) => setProgramName(e.detail.value)}

          ></IonInput>

        </IonItem>
        <IonItemSliding>
          <IonItem>
            <ion-buttons slot="start">
              <ion-button>
                ＋
          </ion-button>

              <IonInput
                value={programName}
                placeholder="番組名"
                onIonChange={(e) => setProgramName(e.detail.value)}
              ></IonInput>
            </ion-buttons>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => console.log('share clicked')}>削除</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        <ion-button expand="block">ラベル印刷</ion-button>
      </IonContent>
    </IonPage >
  );
};

export default MakeList;
