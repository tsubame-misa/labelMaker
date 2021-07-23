import { IonSlide } from "@ionic/react";
import "./Slide.css";

const Slide1 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo"></div>
        <div className="position">
          <h2 className="title">Donutsへようこそ</h2>
          <p>簡単にディスクを管理しましょう！</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide1;
