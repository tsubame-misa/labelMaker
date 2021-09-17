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
  IonTitle,
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

  function initPrograms() {
    if (JSON.stringify(programs) === JSON.stringify([{ id: 0, name: "" }])) {
      return true;
    }
    return false;
  }
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar className="Header">
            {/*} <IonTitle>編集中...</IonTitle>*/}
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="戻る" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                expand="block"
                disabled={labelName === null && initPrograms()}
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
          <IonToolbar className="LabelName">
            <IonInput
              value={labelName}
              placeholder="〇〇特集"
              onIonChange={(e) => setLabelName(e.detail.value)}
              className="LabelName"
              onBlur={() => pushData()}
            ></IonInput>
          </IonToolbar>
        </IonHeader>

        {programs?.map((item, key) => {
          return (
            <IonItemSliding key={item.id}>
              <IonItem className="Item">
                <IonInput
                  value={item.name}
                  placeholder="20xx年xx月xo日 〇〇さんxx出演"
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
        <div className="plus-button-group">
          <div className="plus-button">
            <IonButton
              fill="outline"
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
              className="AddButton"
            >
              <IonIcon icon={addOutline} color="primary" />
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
