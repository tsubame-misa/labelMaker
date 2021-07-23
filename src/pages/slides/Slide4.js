import { IonSlide } from "@ionic/react";
import img from "../../images/P4.png";
import "./Slide.css";

const Slide4 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo">
          <img src={img} alt="ロゴ画像" style={{ width: "80%" }} />
        </div>
        <div className="position">
          <h2 className="title">見る</h2>
          <p>QRコードを読み込んで中身を確認する</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide4;
