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
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ history }) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState();

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

  useEffect(() => {});

  function delItem(id) {
    const newData = data.filter((d) => d.id !== id);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(newData));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LableMaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
