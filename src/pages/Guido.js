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

const Guido = ({ modal, history }) => {
  return (
    <IonPage>
      {modal ? (
        []
      ) : (
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" color="dark" text="戻る" />
            </IonButtons>
            <IonTitle>利用ガイド</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen class="ion-padding" scroll-y="false">
        <IonSlides
          pager={true}
          options={{ initialSlide: 0 }}
          style={{ height: "100%" }}
        >
          <Slide0 />
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

export default Guido;
