import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import { addOutline } from "ionicons/icons";
  import "../pages/Home.css";
  
  const makeList = () => {
    return (
      <IonPage>    
        <IonContent fullscreen>
          make List
        </IonContent>
      </IonPage>
    );
  };
  
  export default makeList;
  