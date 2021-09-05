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
/**TODO:Home.cssじゃなくす */
import "../pages/Home.css";
import { useState } from "react";
import { useParams } from "react-router";
import { addOutline } from "ionicons/icons";
import { getAllData, updateData, setData2DB } from "../pages/service/api";

const MakeList = ({ history }) => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ id: 0, name: "" }]);
  const [labelName, setLabelName] = useState(null);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState(null);

  useIonViewWillEnter(() => {
    (async () => {
      const data = await getAllData();
      setData(data);
      //データの取り方次第でここなくせそう
      if (data !== null) {
        for (const item of data) {
          console.log(item.id, id);
          if (item.id === id) {
            setProcrams(item.i_list);
            setLabelName(item.label);
          }
        }
      }
    })();
  }, [data]);

  function pushData() {
    const rmNothing = programs.filter((p) => p.name !== "");

    if (
      (labelName === undefined || labelName === "") &&
      rmNothing.length === 0
    ) {
      return 0;
    }
    const newData = { id: id, label: labelName, i_list: rmNothing };
    setItemData(newData);
    return 1;
  }

  function delItem(key) {
    const newData = programs.filter((_, i) => i !== key);
    setProcrams(newData);
  }

  function addNewProgram() {
    let randomId = Math.floor(Math.random() * 1000);
    let same = true;
    if (programs.length > 0) {
      while (same) {
        for (const d of programs) {
          if (d.id !== randomId) {
            same = false;
          } else {
            same = true;
          }
        }
        if (same) {
          randomId = Math.floor(Math.random() * 1000);
        }
      }
    }
    const newPrograms = Array.from(programs);
    newPrograms.push({ id: randomId, name: "" });
    setProcrams(newPrograms);
  }

  //useIonViewWillLeaveでなんでできない？
  function save() {
    let same = false;
    const newData = data.map((item) => {
      if (item.id === id) {
        same = true;
        return itemData;
      } else {
        return item;
      }
    });
    if (!same) {
      newData.push(itemData);
    }
    if (data.length === 0) {
      console.log("set");
      setData2DB(newData);
    } else {
      console.log("update");
      updateData(newData);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar class="Header">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="戻る" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                expand="block"
                onClick={() => {
                  save();
                }}
              >
                保存
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => {
                  const saved = save();
                  //if (saved) {
                  history.push(`/list/${id}/qrcode`);
                  // }
                }}
              >
                QRコード
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar class="LabelName">
            <IonInput
              value={labelName}
              placeholder="ディスク"
              onIonChange={(e) => setLabelName(e.detail.value)}
              className="LabelName"
              onBlur={() => pushData()}
            ></IonInput>
          </IonToolbar>
        </IonHeader>

        {programs?.map((item, key) => {
          return (
            <IonItemSliding key={item.id}>
              <IonItem class="Item">
                <IonInput
                  value={item.name}
                  placeholder="タイトル"
                  onIonChange={(e) => {
                    const newPrograms = Array.from(programs);
                    newPrograms[key].name = e.detail.value;
                    setProcrams(newPrograms);
                  }}
                  onBlur={() => pushData()}
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
              if (programs.length > 0) {
                const preData = programs[programs.length - 1];
                if (preData.name !== "") {
                  addNewProgram();
                }
              } else {
                addNewProgram();
              }
            }}
            class="AddButton"
          >
            <IonIcon icon={addOutline} color="primary" />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
