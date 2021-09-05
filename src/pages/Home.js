import {
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItemSliding,
  useIonViewWillEnter,
  IonSearchbar,
  IonItemDivider,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { addOutline, search, helpOutline } from "ionicons/icons";
import { useState } from "react";
import Guide from "./Guide";
import "./Home.css";
import firebase from "../config";

const Home = ({ history }) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState();
  const [searchText, setSearchText] = useState("");
  const [serch, setSearch] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [allData, setAllData] = useState([]);

  useIonViewWillEnter(() => {
    (async () => {
      try {
        const db = firebase.firestore();
        db.collection("/users")
          .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
          .get()
          .then(function (doc) {
            if (doc.exists) {
              const firestoreData = doc.data().data;
              setData(firestoreData);
              setAllData(firestoreData);
              let randomId = Math.floor(Math.random() * 10000);
              let same = true;
              if (firestoreData !== null && firestoreData?.length > 0) {
                while (same) {
                  for (const d of firestoreData) {
                    if (d.id !== randomId) {
                      same = false;
                    } else {
                      same = true;
                    }
                  }
                  if (same) {
                    randomId = Math.floor(Math.random() * 10000);
                  }
                }
              }
              setNextId(randomId);
              setItemData([]);
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
    })();
  });

  function delItem(id) {
    const newData = data.filter((d) => d.id !== id);
    try {
      const db = firebase.firestore();
      db.collection("users")
        .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
        .set({
          data: newData,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    }
  }

  async function getData() {
    try {
      const db = firebase.firestore();
      db.collection("/users")
        .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setData(doc.data().data);
          } else {
            console.log("no data");
          }
        })
        .catch(function (error) {
          console.log("Error : ", error);
        });
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    }
  }

  function findWord(item, word) {
    if (item) {
      const find = item.indexOf(`${word}`);
      if (find !== -1) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  async function SearchData(search, word) {
    if (search && (word === "" || word === undefined)) {
      return;
    }

    setSearchText(word);
    const newData = allData.filter((item) => findWord(item.label, word));
    const newItemData = [];
    for (const label of allData) {
      for (const item of label.i_list) {
        if (findWord(item.name, word)) {
          newItemData.push({ label: label, item: item });
        }
      }
    }

    if (search) {
      if (newData.length > 0) {
        setData(newData);
        setSearchItem(newData);
      } else {
        setData([]);
      }
      if (newItemData.length > 0) {
        setItemData(newItemData);
      } else {
        setItemData([]);
      }
    }

    if (!search) {
      setSearch(!search);
      setData(allData);
      setSearchItem([]);
      setItemData([]);
    }
  }

  function logined() {
    if ("visited" in localStorage) {
      return true;
    } else {
      return false;
    }
  }

  if (logined() === false) {
    return <Guide modal={true} />;
  }

  console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="Header">
          <IonTitle>Donuts</IonTitle>
          <IonButtons slot="end" style={{ marginRight: "10px" }}>
            <IonButton
              fill="outline"
              strong={true}
              onClick={() => {
                history.push("/setting");
              }}
            >
              <IonIcon icon={helpOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          showCancelButton="focus"
          placeholder="検索"
          cancelButtonText="キャンセル"
          onIonCancel={() => SearchData(false)}
          onIonChange={(e) => {
            setSearch(!search);
            SearchData(true, e.detail.value);
          }}
        ></IonSearchbar>

        {/**TODO:サーチ有無でコンポーメント分ける */}
        <div>
          {searchItem.length > 0 ? (
            <IonItemDivider color="light">ディスク名</IonItemDivider>
          ) : (
            []
          )}
          {data?.map((d, key) => {
            return (
              <IonItemSliding key={d.id}>
                <IonItem routerLink={`/list/${data[key].id}`}>
                  {d.label}
                </IonItem>
                <IonItemOptions>
                  <IonItemOption
                    color="danger"
                    expandable
                    onClick={async () => {
                      await delItem(d.id);
                      const newData = await getData();
                    }}
                  >
                    delete
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
          {itemData.length > 0 ? (
            <IonItemDivider color="light">タイトル名</IonItemDivider>
          ) : (
            []
          )}
          {itemData?.map((d) => {
            return (
              <IonItem
                routerLink={`/list/${d.label.id}`}
                key={"0" + d.label.id + String(d.item.id)}
              >
                {d.label.label} &ensp;
                <b>{d.item.name}</b>
              </IonItem>
            );
          })}
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" id={"test"}>
          <IonFabButton
            color="primary"
            onClick={() => {
              history.push(`/makeList/${nextId}`);
            }}
          >
            <IonIcon icon={addOutline} size="20px" />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default Home;
