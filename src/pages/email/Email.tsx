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
import ReactDOMServer from "react-dom/server";
import { Form, Formik, useField } from "formik";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { RegisterFormInterface } from "../../interfaces/RegisterForm.interface";
import HeaderComponent from "../../components/Header/Header";
import InputComponent from "../../components/Input/Input";
import ModalErrorComponent from "../../components/ModalError/ModalError";
import { emailFormValidation } from "../../configs/EmailFormValidations.config";
import { AppContext } from "../../context/App.context";
import { EmailInterface } from "../../interfaces/Email.interface";

import { ModalErrorInterface } from "../../interfaces/ModalError.interface";
import { LoginLabels } from "../../labels/Login.labels";
import { ApiClienteMethods } from "../../services/HttpService.service";

const Email: React.FC = () => {
  const { appContextValue } = useContext(AppContext);
  const { listEnterprises } = appContextValue;
  const [initialValues] = useState<EmailInterface>({
    dest: "",
    html: "",
  });
  const history = useHistory();
  const clickModal = () => {
    setErrorBody({
      isOpen: false,
      labelButton: "Cerrar",
      message: ``,
      title: "Email",
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
  const [form, setForm] = useState<EmailInterface>();
  const onSubmit = (body: EmailInterface) => {
    setForm(body);
  };
  const sendEmail = async () => {
    try {
      await ApiClienteMethods.email.sendEmail(
        form?.dest!,
        ReactDOMServer.renderToString(generateHTML())
      );
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `Email enviado`,
        title: "Email",
        clickEvent: clickModal,
      });
      history.push("/list-enterprise");
    } catch (e) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e}`,
        title: "Error Login",
        clickEvent: clickModal,
      });
    }
  };
  const generateHTML = () => {
    return (
      <IonRow>
        <IonCol size="12" className="text-center">
          <IonItem lines="none" mode="md">
            <IonLabel>Empresas registradas</IonLabel>
          </IonItem>
        </IonCol>
        {listEnterprises &&
          listEnterprises.map(
            (enterprise: RegisterFormInterface, index: number) => {
              return (
                <div>
                  <h4>Nombre: {enterprise.name}</h4>
                  <br />
                  <h4>Nit: {enterprise.nit}</h4>
                  <br />
                  <h4>Dirección: {enterprise.address}</h4>
                  <br />
                  <h4>Tel: {enterprise.phone}</h4>
                  <br />
                </div>
              );
            }
          )}
      </IonRow>
    );
  };
  return (
    <IonPage>
      <HeaderComponent title={"Email"} visible={false} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="mt-100" size="10" offset="1">
              <Formik
                initialValues={initialValues}
                onSubmit={(values: EmailInterface) => {
                  onSubmit(values);
                }}
                validationSchema={emailFormValidation}
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
                          name="dest"
                          placeholder={LoginLabels.placeholderEmail}
                          value={formikProps.values.dest}
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
                          type="submit"
                          onClick={() => {
                            sendEmail();
                          }}
                        >
                          {"Enviar"}
                        </IonButton>
                      </IonCol>
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

export default Email;
