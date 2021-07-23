import { IonSlide } from "@ionic/react";

const Slide1 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo"></div>
        <div className="position">
          <h2 style={{ margin: "1.5rem" }}>Donutへようこそ</h2>
          <p>なんかいい感じの一言？</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide1;
