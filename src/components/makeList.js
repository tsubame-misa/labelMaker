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
import firebase from "../config";

const MakeList = ({ history }) => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ id: 0, name: "" }]);
  const [labelName, setLabelName] = useState(null);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState(null);

  useIonViewWillEnter(() => {
    try {
      const db = firebase.firestore();
      db.collection("/users")
        .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const firestoreData = doc.data().data;
            setData(firestoreData);
            //データの取り方次第でここなくせそう
            if (firestoreData !== null) {
              for (const item of firestoreData) {
                if (item.id === id) {
                  setProcrams(item.i_list);
                  setLabelName(item.label);
                }
              }
            }
          } else {
            console.log("No user");
          }
        })
        .catch(function (error) {
          console.log("Error : ", error);
        });
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    }
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
    const db = firebase.firestore();
    let same = false;
    const newData = data.map((item) => {
      console.log(item.id, id, item.id === id);
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

    console.log(newData);

    try {
      db.collection("users")
        .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
        .update({
          data: newData,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          return 0;
        });
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return 0;
    }
    return 1;
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
                  if (saved) {
                    history.push(`/list/${id}/qrcode`);
                  }
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
