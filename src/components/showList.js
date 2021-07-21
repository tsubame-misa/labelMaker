import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonItemSliding,
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

const ShowList = () => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ name: "" }]);
  const [labelName, setLabelName] = useState();

  useIonViewWillEnter(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    for (const item of data) {
      if (item.id === id) {
        setProcrams(item.i_list);
        setLabelName(item.label);
      }
    }
  }, [programs]);

  function delItem(key) {
    const newPrograms = programs.filter((_, i) => i !== key);
    setProcrams(newPrograms);
    const newObj = { id: Number(id), label: labelName, i_list: newPrograms };
    const data = JSON.parse(localStorage.getItem("data"));
    const newData = data.map((item) => {
      if (item.id === Number(id)) {
        return newObj;
      } else {
        return item;
      }
    });

    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(newData));
  }

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
              <IonButton
                expand="block"
                routerLink={`/list/${id}/qrcode`}
                color="primary"
              >
                ラベル印刷
              </IonButton>
              <IonButton routerLink={`/makeList/${id}`} color="primary">
                編集
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonItem lines="none">{labelName}</IonItem>
          </IonToolbar>
        </IonHeader>

        {programs?.map((item, key) => {
          return (
            <IonItemSliding key={item.id}>
              <IonItem>{item.name}</IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => delItem(key)}>
                  削除
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default ShowList;
