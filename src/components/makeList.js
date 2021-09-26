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
  const [programs, setPrograms] = useState([{ id: 0, name: "" }]);
  const [labelName, setLabelName] = useState(null);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState(null);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const [preLabel, setPreLabel] = useState(null);
  const [preProgram, setPreProgram] = useState([]);

  useIonViewWillEnter(() => {
    (async () => {
      const data = await getAllData();
      setData(data);
      //データの取り方次第でここなくせそう
      if (data !== null) {
        for (const item of data) {
          if (item.id === id) {
            if (item.i_list.length !== 0) {
              setPrograms(item.i_list);
              setPreProgram(item.i_list);
            }
            setLabelName(item.label);
            setPreLabel(item.label);
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
    console.log(key, programs);
    const newData = programs.filter((_, i) => i !== key);
    console.log(newData);
    setItemData({ id: id, label: labelName, i_list: newData });
    setPrograms(newData);
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
    setPrograms(newPrograms);
  }

  //useIonViewWillLeaveでなんでできない？
  function save() {
    //TODO:一回消すとダメ
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
                disabled={
                  (labelName === null || labelName === "") && initPrograms()
                }
                onClick={() => {
                  save();
                }}
              >
                保存
              </IonButton>
              <IonButton
                expand="block"
                onClick={() => {
                  save();
                  //if (saved) {
                  history.push(`/list/${id}/qrcode`);
                  // }
                }}
              >
                QRコード
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <div className="make-bar">登録・編集中</div>
          <IonToolbar className="LabelName">
            <IonInput
              value={labelName}
              placeholder="〇〇特集"
              onIonChange={(e) => setLabelName(e.detail.value)}
              className="LabelName"
              onBlur={() => pushData()}
              style={{ fontSize: "1.5rem" }}
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
                    if (e.target.value !== "") {
                      setShowPlusButton(true);
                    } else {
                      setShowPlusButton(false);
                    }
                    const newPrograms = Array.from(programs);
                    newPrograms[key].name = e.detail.value;
                    setPrograms(newPrograms);
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
            {showPlusButton && (
              <IonButton
                fill="outline"
                onClick={() => {
                  if (programs.length > 0) {
                    const preData = programs[programs.length - 1];
                    if (preData.name !== "") {
                      addNewProgram();
                      setShowPlusButton(false);
                    }
                  } else {
                    addNewProgram();
                    setShowPlusButton(false);
                  }
                }}
                className="AddButton"
              >
                <IonIcon icon={addOutline} color="primary" />
              </IonButton>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MakeList;
