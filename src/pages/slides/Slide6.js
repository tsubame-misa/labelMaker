import { IonSlide, IonButton } from "@ionic/react";
import img from "../../images/p2.png";
const Slide5 = () => {
  function logined() {
    if ("visited" in localStorage) {
      return true;
    } else {
      return false;
    }
  }

  function setVisited() {
    if (!logined()) {
      localStorage.setItem("visited", "true");
    }
  }

  return (
    <IonSlide>
      <div className="center_m5">
        <p>何か一言</p>
        <IonButton
          routerLink={"/home"}
          fill="outline"
          size="large"
          onClick={() => {
            setVisited();
          }}
        >
          はじめる
        </IonButton>
      </div>
    </IonSlide>
  );
};

export default Slide5;
