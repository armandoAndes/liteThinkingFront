import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Components */
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Item from "./pages/item/Item";
import ListEnterprise from "./pages/listEnterprise/ListEnterprise";

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
import "./theme/variables.scss";
import GuardSession from "./guard/SessionGuard.guard";
import { useState } from "react";
import { AppContext } from "./context/App.context";
import { ContextInterface } from "./interfaces/Context.interface";
import Email from "./pages/email/Email";

setupIonicReact();

const App: React.FC = () => {
  const [appContext, setAppContext] = useState<Partial<ContextInterface>>({
    user: {
      name: "",
      password: "",
    },
    listEnterprises: []
  });
  return (
    <AppContext.Provider value={{ appContextValue: appContext, setAppContext }}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/" component={Login}>
              <Redirect to="/login" />
            </Route>
            <GuardSession component={Login} exact={true} path="/login" />
            <GuardSession component={Register} exact={true} path="/register" />
            <GuardSession component={Email} exact={true} path="/email" />
            <GuardSession
              component={Item}
              exact={true}
              path="/register-product"
            />
            <GuardSession
              component={ListEnterprise}
              exact={true}
              path="/list-enterprise"
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
