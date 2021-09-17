import {
  IonContent,
  IonHeader,
  IonPage,
  IonSlides,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import {
  Slide0,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
} from "./slides";
import "../pages/Home.css";

const Guide = ({ modal, history }) => {
  return (
    <IonPage>
      {modal ? (
        []
      ) : (
        <IonHeader>
          <IonToolbar className="Header">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="戻る" />
            </IonButtons>
            <IonTitle>利用ガイド</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen className="ion-padding" scroll-y="false">
        <IonSlides
          pager={true}
          options={{ initialSlide: 0 }}
          style={{ height: "100%" }}
        >
          {modal ? <Slide0 /> : []}
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide4 />
          <Slide5 />
          {modal ? <Slide6 /> : []}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Guide;
