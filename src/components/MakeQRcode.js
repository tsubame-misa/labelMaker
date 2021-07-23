import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
} from "@ionic/react";
import "../pages/Home.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import img from "./panda.PNG";
import img2 from "../images/P1.png";
import QRCode from "qrcode.react";

const MakeQRcode = () => {
  const { id } = useParams();
  const [labelName, setLabelName] = useState();
  const [png, setPng] = useState(null);
  //const [sample, setSample] = useState(null);

  useIonViewWillEnter(() => {
    const getData = JSON.parse(localStorage.getItem("data")) || [{ name: "" }];
    for (const item of getData) {
      if (item.id === id) {
        setLabelName(item.label);
      }
    }
  }, [labelName]);

  const width = 200;
  const height = 200;

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`
      );
      console.log(res);

      fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`
      )
        .then(function (response) {
          // 画像読み込み
          const board = document.querySelector("#board"); //getElementById()等でも可。オブジェクトが取れれば良い。
          /*const canvasElem = document.createElement("canvas");
          canvasElem.width = width;
          canvasElem.height = height;
          const ctx2 = canvasElem.getContext("2d");*/
          const ctx2 = board.getContext("2d");

          if (labelName) {
            ctx2.font = "20pt Arial";
            ctx2.textAlign = "center";
            ctx2.textBaseline = "ideographic";
            ctx2.fillStyle = "rgba(0)";
            ctx2.fillText(labelName, width / 2, height); // 座標 (20, 50) にテキスト描画
          }

          const chara = new Image();
          chara.src = img2; // 画像のURLを指定
          //console.log(response);
          //chara.src = response.url; //`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`;

          chara.onload = () => {
            ctx2.drawImage(
              chara,
              0,
              0,
              width,
              height,
              (width * (1 - 0.85)) / 2,
              0,
              width * 0.85,
              height * 0.85
            );
          };

          setPng(board.toDataURL());
          //setPng(canvasElem.toDataURL());
        })
        .then(function (blob) {
          //  console.log(blob);
          // setPng(blob);
          // here the image is a blob
        });
    })();

    /*const canvasElem = document.createElement("canvas");
      canvasElem.width = width;
      canvasElem.height = height;
      const ctx = canvasElem.getContext("2d");*/
  }, [id, labelName]);
  console.log(png);

  /*useEffect(() => {
    const board = document.querySelector("#board");
    // console.log(board.toDataURL());
  }, [png]);*/

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary" defaultHref="/home" text="戻る" />
          </IonButtons>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <canvas id="board" width="200" height="200"></canvas>
        </div>

        {/* <div>
          <figure>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.REACT_APP_API_ENDPOINT}/list/${id}`}
              style={{ width: "50%" }}
              alt=""
            />
            <figcaption> {labelName}</figcaption>
          </figure>
       </div>*/}

        <div>
          {png && (
            <div className="comp" style={{ display: "flex" }}>
              <img
                alt="round icon"
                src={png}
                style={{ borderRadius: "100%" }}
              />
            </div>
          )}
        </div>

        {/*} <div>
          <QRCode value="https://google.com" label="test" />
          </div>*/}
      </IonContent>
    </IonPage>
  );
};
export default MakeQRcode;
