import { IonSlide } from "@ionic/react";
import img1 from "../../images/P3_1.png";
import img2 from "../../images/p3_2.png";
import "./Slide.css";

const Slide3 = () => {
  return (
    <IonSlide>
      <div>
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <img
            src={img1}
            alt="ロゴ画像"
            style={{ maxWidth: "200px", width: "45%", paddingRight: "2.5%" }}
          />
          <img
            src={img2}
            alt="ロゴ画像"
            style={{ maxWidth: "200px", width: "45%", paddingLeft: "2.5%" }}
          />
        </div>
        <div className="position">
          <h2 className="title">貼る</h2>
          <p>
            QRコードを印刷して
            <br />
            ディスクやケースに貼る
          </p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide3;
