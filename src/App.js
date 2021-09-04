import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import makeList from "./components/makeList";
import ShowList from "./components/showList";
import MakeQRcode from "./components/MakeQRcode";
import Guide from "./pages/Guide";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Setting from "./pages/Setting";
import Start from "./pages/Start";
import { useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import firebase from "./config";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [user]);

  console.log(user);

  return (
    <IonApp>
      <IonReactRouter>
        {user === null ? (
          /*<IonRouterOutlet>
            <Route exact path="/" component={Start} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </IonRouterOutlet>*/
          <Start />
        ) : (
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/setting/guide" component={Guide} />
            <Route exact path="/makeList/:id" component={makeList} />
            <Route exact path="/list/:id" component={ShowList} />
            <Route exact path="/list/:id/qrcode" component={MakeQRcode} />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
