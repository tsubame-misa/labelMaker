import { useState } from "react";
import firebase from "firebase";
import { IonPage, IonContent } from "@ionic/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  function registration() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("ok");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("err");
      });
  }

  return (
    <IonPage>
      <IonContent>
        <div>
          <h1>ユーザ登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                placeholder="email"
                onChange={(event) => handleChangeEmail(event)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={(event) => handleChangePassword(event)}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  registration();
                }}
              >
                登録
              </button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
