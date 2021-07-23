import { IonSlide } from "@ionic/react";
import img from "../../images/P1.png";
const Slide1 = () => {
  return (
    <IonSlide>
      <div>
        <div className="logo">
          <img src={img} alt="ロゴ画像" style={{ width: "90%" }} />
        </div>
        <div className="position">
          <h2 style={{ margin: "1.5rem" }}>ダビングする</h2>
          <p>DVDやBlu-rayディスクにダビングする</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default Slide1;
