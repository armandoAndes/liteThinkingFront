import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import { Form, Formik, useField } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import HeaderComponent from "../../components/Header/Header";
import InputComponent from "../../components/Input/Input";
import { registerFormValidation } from "../../configs/RegisterFormValidations.config";
import { RegisterFormInterface } from "../../interfaces/RegisterForm.interface";
import { RegisterLabels } from "../../labels/Register.labels";
import { ApiClienteMethods } from "../../services/HttpService.service";
import "./Register.scss";
const Register: React.FC = () => {
  const [initialValues] = useState<RegisterFormInterface>({
    address: "",
    name: "",
    nit: "",
    phone: "",
  });
  const history = useHistory();
  const [form, setForm] = useState<RegisterFormInterface>();
  const onSubmit = async (body: RegisterFormInterface) => {
    setForm(body);
  };
  const createEnterprise = async (body: RegisterFormInterface) => {
    try {
      const res = await ApiClienteMethods.register.register(body);
      history.replace('/list-enterprise');
    } catch (e) {
      console.log("error", e);
    }
  };
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
                          type="text"
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
    </IonPage>
  );
};

export default Register;
