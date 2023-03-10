import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
} from "@ionic/react";
import { Form, Formik, useField } from "formik";
import { useContext, useState } from "react";
import { useHistory } from "react-router";

import HeaderComponent from "../../components/Header/Header";
import InputComponent from "../../components/Input/Input";
import ModalErrorComponent from "../../components/ModalError/ModalError";
import { loginFormValidation } from "../../configs/LoginFormValidations.config";
import { AppContext } from "../../context/App.context";

import { LoginFormInterface } from "../../interfaces/LoginForm.interface";
import { ModalErrorInterface } from "../../interfaces/ModalError.interface";
import { LoginLabels } from "../../labels/Login.labels";
import { ApiClienteMethods } from "../../services/HttpService.service";

const Login: React.FC = () => {
  const { appContextValue, setAppContext } = useContext(AppContext);
  
  const [initialValues] = useState<LoginFormInterface>({
    name: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();
  const clickModal = () => {
    setErrorBody({
      isOpen: false,
      labelButton: "Cerrar",
      message: ``,
      title: "Error",
      clickEvent: clickModal,
    });
  };
  const [errorBody, setErrorBody] = useState<ModalErrorInterface>({
    isOpen: false,
    labelButton: "Cerrar",
    message: "Error: ",
    title: "Error Login",
    clickEvent: clickModal,
  });
  const [form, setForm] = useState<LoginFormInterface>();
  const onSubmit = (body: LoginFormInterface) => {
    setForm(body);
  };

  const login = async (body: LoginFormInterface) => {
    try {
      const res = await ApiClienteMethods.login.auth(body);
      if (res.length > 0) {
        localStorage.setItem("user", JSON.stringify(res[0]));
        setAppContext({
          user: res[0],
        });
        history.push("/list-enterprise");
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e}`,
        title: "Error Login",
        clickEvent: clickModal,
      });
    }
  };
  return (
    <IonPage>
      <HeaderComponent title={LoginLabels.headerTitle} visible={false} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="mt-100" size="10" offset="1">
              <Formik
                initialValues={initialValues}
                onSubmit={(values: LoginFormInterface) => {
                  onSubmit(values);
                }}
                validationSchema={loginFormValidation}
                validateOnChange={true}
                validateOnBlur={true}
                validateOnMount={true}
                initialTouched={true}
              >
                {(formikProps) => (
                  <Form id="form-login">
                    <IonRow>
                      <IonCol size="12">
                        <InputComponent
                          id="login-email"
                          ionLabelPosition="floating"
                          label={LoginLabels.labelEmail}
                          type="email"
                          name="name"
                          placeholder={LoginLabels.placeholderEmail}
                          value={formikProps.values.name}
                          onIonChange={(e: any) => {
                            formikProps.handleChange(e);
                          }}
                          useField={useField}
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="12">
                        <InputComponent
                          id="login-password"
                          ionLabelPosition="floating"
                          label={LoginLabels.labelPassword}
                          type="password"
                          name="password"
                          placeholder={LoginLabels.placeholderPassword}
                          value={formikProps.values.password}
                          onIonChange={(e: any) => {
                            formikProps.handleChange(e);
                          }}
                          useField={useField}
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="12">
                        <IonButton
                          disabled={!formikProps.isValid}
                          color="primary"
                          mode="md"
                          onClick={() => {
                            login(formikProps.values);
                          }}
                        >
                          {LoginLabels.button}
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      {error && (
                        <IonCol className="">
                          <IonItem
                            className="text-center li-lb li-lb-error"
                            lines="none"
                            mode="md"
                          >
                            <IonLabel className="text-center li-lb li-lb-error">
                              No existe usuario :(
                            </IonLabel>
                          </IonItem>
                        </IonCol>
                      )}
                    </IonRow>
                  </Form>
                )}
              </Formik>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonModal className="modal-component-error" isOpen={errorBody.isOpen}>
          <ModalErrorComponent {...errorBody} />
        </IonModal>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
