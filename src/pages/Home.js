import {
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItem,
  IonButton,
  IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./Home.css";

const Home = ({ history }) => {
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LableMaker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data.map(() => {
          return <IonItem></IonItem>;
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
