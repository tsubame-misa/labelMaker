import { IonSlide } from "@ionic/react";
import img from "../../images/p2.png";
const Slide4 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo">
          <img src={img} alt="ロゴ画像" style={{ width: "80%" }} />
        </div>
        <div className="position">
          <h2 style={{ margin: "1.5rem" }}>みる</h2>
          <p>QRコードを読み込んで中身を確認する</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide4;
