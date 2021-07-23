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
} from "@ionic/react";
import { addOutline, search } from "ionicons/icons";
import { useEffect, useState } from "react";
import Guide from "./Guido";
import "./Home.css";

const Home = ({ history }) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState();
  const [searchText, setSearchText] = useState("");
  const [serch, setSearch] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [searchItem, setSearchItem] = useState([]);

  useIonViewWillEnter(() => {
    (async () => {
      const getData = await JSON.parse(localStorage.getItem("data"));
      setData(getData);

      let randomId = Math.floor(Math.random() * 10000);
      let same = true;
      if (getData !== null) {
        while (same) {
          for (const d of getData) {
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
    })();
  });

  function delItem(id) {
    const newData = data.filter((d) => d.id !== id);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(newData));
  }

  function findWord(item, word) {
    const find = item.indexOf(`${word}`);
    if (find !== -1) {
      return 1;
    } else {
      return 0;
    }
  }

  async function SearchData(search, word) {
    if (search && (word === "" || word === undefined)) {
      return;
    }

    const allData = await await JSON.parse(localStorage.getItem("data"));
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="HToolbar">
          <IonTitle>Donuts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          showCancelButton="focus"
          onIonCancel={() => SearchData(false)}
          onIonChange={(e) => {
            setSearch(!search);
            SearchData(true, e.detail.value);
          }}
        ></IonSearchbar>

        {/**TODO:サーチ有無でコンポーメント分ける */}
        <div>
          {searchItem.length > 0 ? (
            <IonItemDivider color="light">ラベル</IonItemDivider>
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
                      const newData = await await JSON.parse(
                        localStorage.getItem("data")
                      );
                      setData(newData);
                    }}
                  >
                    delete
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
          {itemData.length > 0 ? (
            <IonItemDivider color="light">アイテム</IonItemDivider>
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

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
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
