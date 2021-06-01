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
} from "@ionic/react";

import "../pages/Home.css";
import { useState } from "react";

const MakeList = () => {
  const [programs, setProcrams] = useState([{ name: "" }]);
  const [labelName, setLabelName] = useState();
  const [data, setData] = useState([]);

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    setData(getData);
  }, [data]);

  function pushData() {
    const new_data = { label: labelName, i_list: programs };
    data.push(new_data);
    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton color="primary" defaultHref="/" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => pushData()}>保存</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonInput
              value={labelName}
              placeholder="ラベル名"
              onIonChange={(e) => setLabelName(e.detail.value)}
            ></IonInput>
          </IonToolbar>
        </IonHeader>

        {programs.map((item, key) => {
          return (
            <IonItemSliding key={key}>
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

        <IonButton expand="block">ラベル印刷</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
