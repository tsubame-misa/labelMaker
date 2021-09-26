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
  IonLabel,
} from "@ionic/react";

import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";
import { getAllData, updateData } from "../pages/service/api";

const ShowList = () => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ id: null, name: "" }]);
  const [labelName, setLabelName] = useState();
  const [data, setData] = useState(null);

  useIonViewWillEnter(() => {
    (async () => {
      const data = await getAllData();
      setData(data);
      //データの取り方次第でここなくせそう
      for (const item of data) {
        if (item.id === id) {
          setProcrams(item.i_list);
          setLabelName(item.label);
        }
      }
    })();
  }, [programs]);

  function delItem(key) {
    const newPrograms = programs.filter((_, i) => i !== key);
    setProcrams(newPrograms);
    const newObj = { id: id, label: labelName, i_list: newPrograms };
    const newData = data.map((item) => {
      if (item.id === id) {
        return newObj;
      } else {
        return item;
      }
    });
    updateData(newData);
  }

  if (programs === undefined) {
    return <div>loading...</div>;
  }
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar className="Header">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="戻る" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton routerLink={`/makeList/${id}`}>編集</IonButton>
              <IonButton expand="block" routerLink={`/list/${id}/qrcode`}>
                QRコード
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar className="Label">
            <IonItem lines="none" style={{ fontSize: "1.5rem" }}>
              {labelName}
            </IonItem>
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
