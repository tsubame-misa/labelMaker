import { IonSlide } from "@ionic/react";
import img from "../../images/p2.png";
import "./Slide.css";

const Slide5 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo">
          <img src={img} alt="ロゴ画像" style={{ width: "80%" }} />
        </div>
        <div className="position">
          <h2 className="title">探す</h2>
          <p>検索バーでどこに番組が入っているか探す</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide5;
