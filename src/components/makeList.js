import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItemSliding,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonAvatar,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "../pages/Home.css";
import { useEffect, useState } from "react";

const MakeList = () => {
  const [programName, setProgramName] = useState([]);
  const [programs, setProcrams] = useState([{ name: "" }]);
  const [data, setData] = useState([]);
  /*useEffect(() => {
    setData(programName);
  }, []);*/

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button>戻る</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button>保存</ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-toolbar>
            <ion-title>番組名を登録する</ion-title>
          </ion-toolbar>
        </IonHeader>

        {programs.map((item, key) => {
          return (
            <IonItemSliding>
              <IonItem>
                <IonInput
                  value={item.name}
                  placeholder="番組名"
                  onIonChange={(e) => {
                    const newPrograms = Array.from(programs);
                    newPrograms[key].name = e.detail.value;
                    setProcrams(newPrograms);
                  }}
                ></IonInput>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="danger"
                  onClick={() => console.log("share clicked")}
                >
                  削除
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}

        <IonButton
          onClick={() => {
            const newPrograms = Array.from(programs);
            newPrograms.push({ name: "" });
            setProcrams(newPrograms);
          }}
        >
          ＋
        </IonButton>

        <ion-button expand="block">ラベル印刷</ion-button>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
