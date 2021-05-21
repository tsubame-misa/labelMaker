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

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    setData(getData);
  }, [data]);

  function delItem(id) {
    console.log("del", id);
    const newData = data.filter((item, key) => key !== id);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(newData));
    console.log(newData);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LableMaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data.map((item, key) => {
          return (
            <IonItemSliding key={key}>
              <IonItem>{item.label}</IonItem>
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
            color="dark"
            onClick={() => {
              history.push("/makeList");
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
