import { IonSlide } from "@ionic/react";
import img from "../../images/P4.png";
import "./Slide.css";

const Slide4 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo">
          <img
            src={img}
            alt="ロゴ画像"
            style={{ maxWidth: "400px", width: "80%" }}
          />
        </div>
        <div className="position">
          <h2 className="title">見る</h2>

          <p style={{ marginBottom: "3px" }}>
            QRコードを読み込んで中身を確認する
          </p>
          <p
            style={{
              fontSize: "1rem",
              // marginTop: "0px",
            }}
          >
            ※リストを作成した時と
            <br />
            <b style={{ color: "#f0973f" }}>同じ端末の同じブラウザ</b>
            で見てください
          </p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide4;
