import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonModal,
  IonPage,
  IonRow,
} from "@ionic/react";
import { Form, Formik, useField } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HeaderComponent from "../../components/Header/Header";
import InputComponent from "../../components/Input/Input";
import ModalErrorComponent from "../../components/ModalError/ModalError";
import { registerFormValidation } from "../../configs/RegisterFormValidations.config";
import { ModalErrorInterface } from "../../interfaces/ModalError.interface";
import { RegisterFormInterface } from "../../interfaces/RegisterForm.interface";
import { RegisterLabels } from "../../labels/Register.labels";
import { ApiClienteMethods } from "../../services/HttpService.service";

const Register: React.FC = () => {
  const [initialValues] = useState<RegisterFormInterface>({
    address: "",
    name: "",
    nit: "",
    phone: "",
  });
  const [modal, setModal] = useState<boolean>(false);
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
    message: "Error",
    title: "Error",
    clickEvent: clickModal,
  });

  const history = useHistory();
  const [form, setForm] = useState<RegisterFormInterface>();
  const onSubmit = async (body: RegisterFormInterface) => {
    setForm(body);
  };
  const createEnterprise = async (body: RegisterFormInterface) => {
    try {
      const res = await ApiClienteMethods.register.register(body);
      history.push("/list-enterprise");
    } catch (e: any) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e.response.data.message}`,
        title: "Error al crear empresa",
        clickEvent: clickModal,
      });
    }
  };

  useEffect(() => {
    setModal(true);
  }, [errorBody]);
  return (
    <IonPage>
      <HeaderComponent title={RegisterLabels.headerTitle} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="mt-100" size="10" offset="1">
              <Formik
                initialValues={initialValues}
                onSubmit={(values: RegisterFormInterface) => {
                  onSubmit(values);
                }}
                validationSchema={registerFormValidation}
                validateOnChange={true}
                validateOnBlur={true}
                validateOnMount={true}
                initialTouched={true}
              >
                {(formikProps) => (
                  <Form>
                    <IonRow>
                      <IonCol size="12">
                        <InputComponent
                          id="login-password"
                          ionLabelPosition="floating"
                          label={RegisterLabels.labelName}
                          type="text"
                          name="name"
                          placeholder={RegisterLabels.placeholderName}
                          value={formikProps.values.name}
                          onIonChange={(e: any) => {
                            formikProps.handleChange(e);
                            formikProps.setTouched({
                              name: true,
                            });
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
                          label={RegisterLabels.labelAddress}
                          type="text"
                          name="address"
                          placeholder={RegisterLabels.placeholderAddress}
                          value={formikProps.values.address}
                          onIonChange={(e: any) => {
                            formikProps.handleChange(e);
                            formikProps.setTouched({
                              address: true,
                            });
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
                          label={RegisterLabels.labelNit}
                          type="text"
                          placeholder={RegisterLabels.placeholderNit}
                          name="nit"
                          value={formikProps.values.nit}
                          onIonChange={(e: any) => {
                            formikProps.handleChange(e);
                            formikProps.setTouched({
                              nit: true,
                            });
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
                          label={RegisterLabels.labelPhone}
                          type="tel"
                          placeholder={RegisterLabels.placeholderPhone}
                          name="phone"
                          value={formikProps.values.phone}
                          onIonChange={(e: any) => {
                            formikProps.setTouched({
                              phone: true,
                            });
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
                          onClick={() => createEnterprise(formikProps.values)}
                        >
                          {RegisterLabels.button}
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

export default Register;
