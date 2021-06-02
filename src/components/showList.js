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
import { useParams } from "react-router";
import { returnUpBack } from "ionicons/icons";

const ShowList = () => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ name: "" }]);
  const [labelName, setLabelName] = useState();

  useIonViewWillEnter(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    for (const item of data) {
      console.log(item.id, id);
      if (item.id === Number(id)) {
        console.log(item);
        setProcrams(item);
      }
    }
    /*const newData = data.filter((item) => item.id !== Number(id))[0];
    console.log(newData);
    setProcrams(newData);*/
  }, []);

  console.log(programs);
  //console.log(id);
  if (programs === undefined) {
    return <div>loading...</div>;
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
              <IonButton routerLink={`/makeList/${id}`}>編集</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonItem lines="none">{programs.label}</IonItem>
          </IonToolbar>
        </IonHeader>

        {programs.i_list?.map((item, key) => {
          return (
            <IonItemSliding key={key}>
              <IonItem>{item.name}</IonItem>
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

        <IonButton expand="block">ラベル印刷</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ShowList;
