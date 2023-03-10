import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../context/App.context";
import { GuardPropsInterface } from "../interfaces/Guard.interface";
import Login from "../pages/login/Login";

const GuardSession: React.FC<GuardPropsInterface> = (
  props: GuardPropsInterface
) => {
  const { appContextValue, setAppContextMethod } = useContext(AppContext);
  const { user } = appContextValue;
  const userL = JSON.parse(localStorage.getItem("user") || "{}");
  const isLogin = (): boolean => {
    const userContext = user;
    if (userContext && userContext.name.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return isLogin() ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Route exact={props.exact} path={props.path} component={Login} />
  );
};

export default GuardSession;
