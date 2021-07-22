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

const MakeList = ({ history }) => {
  const { id } = useParams();
  const [programs, setProcrams] = useState([{ id: 0, name: "" }]);
  const [labelName, setLabelName] = useState();
  const [data, setData] = useState([]);

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    setData(getData);
    if (getData !== null) {
      for (const item of getData) {
        if (item.id === id) {
          setProcrams(item.i_list);
          setLabelName(item.label);
        }
      }
    }
  }, [data]);

  function pushData() {
    const rmNothing = programs.filter((p) => p.name !== "");

    if (
      (labelName === undefined || labelName === "") &&
      rmNothing.length === 0
    ) {
      //alert("ラベル名とアイテム名を入力してください");
      return 0;
    }
    /*} else if (labelName === undefined || labelName === "") {
      alert("ラベル名を入力してください");
      return 0;
    } else if (rmNothing.length === 0) {
      alert("アイテム名を入力してください");
      return 0;
    }*/

    const newData = { id: id, label: labelName, i_list: rmNothing };

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

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar class="Header">
            <IonButtons slot="start">
              <IonBackButton color="primary" defaultHref="/home" text="戻る" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                expand="block"
                onClick={() => {
                  const saved = pushData();
                  if (saved) {
                    history.push(`/list/${id}/qrcode`);
                  }
                }}
                color="primary"
              >
                ラベル印刷
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar class="LabelName">
            <IonInput
              value={labelName}
              placeholder="ラベル名"
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
                  placeholder="アイテム名"
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
