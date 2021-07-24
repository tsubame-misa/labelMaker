import { IonSlide } from "@ionic/react";
import img from "../../images/p2.png";
import "./Slide.css";

const Slide2 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo">
          <img src={img} alt="ロゴ画像" style={{ width: "80%" }} />
        </div>
        <div className="position">
          <h2 className="title">作る</h2>
          <p>ディスクを登録する</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide2;
