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
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ history }) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState();

  useEffect(() => {
    const getData = async () => {
      const getData = await JSON.parse(localStorage.getItem("data"));
      setData(getData);
    };
    getData();
    const getLastId = localStorage.getItem("lastId");
    getLastId === null
      ? setNextId(0)
      : setNextId(Number(getLastId) + Number(1));
  }, [data]);

  function delItem(id) {
    const newData = data.filter((_, key) => key !== id);
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
                  onClick={() => {
                    delItem(key);
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
