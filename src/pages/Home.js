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
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ history }) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState();
  const [searchText, setSearchText] = useState("");

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
    })();
  });

  function delItem(id) {
    const newData = data.filter((d) => d.id !== id);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(newData));
  }

  function findWord(item, word) {
    const find = item.label.indexOf(`${word}`);
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

    for (const d of data) {
      console.log(d.label, d.label.indexOf(word));
    }

    const allData = await await JSON.parse(localStorage.getItem("data"));
    const newData = allData.filter((item) => findWord(item, word));

    if (search) {
      if (newData.length > 0) {
        setData(newData);
      } else {
        setData([]);
      }
    }
    if (!search) {
      setData(allData);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Donuts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          showCancelButton="focus"
          onIonCancel={() => SearchData(false)}
          onIonChange={(e) => SearchData(true, e.detail.value)}
        ></IonSearchbar>
        {data?.map((d, key) => {
          return (
            <IonItemSliding key={d.id}>
              <IonItem routerLink={`/list/${data[key].id}`}>{d.label}</IonItem>
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
