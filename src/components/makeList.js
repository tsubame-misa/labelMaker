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
} from "@ionic/react";
import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";
import { addOutline } from "ionicons/icons";

const MakeList = ({ history }) => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([]);
  const [labelName, setLabelName] = useState();
  const [data, setData] = useState([]);

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    setData(getData);

    for (const item of getData) {
      if (item.id === id) {
        setProcrams(item.i_list);
        setLabelName(item.label);
      }
    }
  }, [data]);

  function pushData() {
    if (labelName === undefined) {
      alert("ラベル名を入力してください");
    }
    const newData = { id: id, label: labelName, i_list: programs };
    if (data !== null) {
      let changed = false;
      for (const d of data) {
        if (d.id === id) {
          d.i_list = newData.i_list;
          changed = true;
        }
      }
      if (changed) {
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        data.push(newData);
        localStorage.setItem("data", JSON.stringify(data));
      }
    } else {
      localStorage.setItem("data", JSON.stringify([newData]));
    }
  }

  function delItem(key) {
    const newData = programs.filter((_, i) => i !== key);
    setProcrams(newData);
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar class="Header">
            <IonButtons slot="start">
              <IonBackButton color="primary" defaultHref="/home" text="戻る" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => pushData()} color="primary">
                保存
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar class="LabelName">
            <IonInput
              value={labelName}
              placeholder="ラベル名"
              onIonChange={(e) => setLabelName(e.detail.value)}
              class="LabelName"
            ></IonInput>
          </IonToolbar>
        </IonHeader>

        {programs?.map((item, key) => {
          return (
            <IonItemSliding key={key}>
              <IonItem class="Item">
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
                <IonItemOption color="danger" onClick={() => delItem(key)}>
                  削除
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}
        <div style={{ padding: "5px" }}>
          <IonButton
            fill="clear"
            onClick={() => {
              const newPrograms = Array.from(programs);
              newPrograms.push({ name: "" });
              setProcrams(newPrograms);
            }}
            class="AddButton"
          >
            <IonIcon icon={addOutline} color="primary" />
          </IonButton>
        </div>

        <IonButton
          color="primary"
          expand="block"
          onClick={() => {
            pushData();
            history.push(`/list/${id}/qrcode`);
          }}
        >
          ラベル印刷
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
