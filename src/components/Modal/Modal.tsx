import { IonButton, IonCol, IonModal, IonRow } from "@ionic/react";
import { Form, Formik, useField } from "formik";
import { useState } from "react";
import { registerFormValidation } from "../../configs/RegisterFormValidations.config";
import { RegisterFormInterface } from "../../interfaces/RegisterForm.interface";
import { RegisterLabels } from "../../labels/Register.labels";
import InputComponent from "../Input/Input";

interface ModalInterface {
  [x: string]: any;
  editClick: (enterprise: RegisterFormInterface) => void;
}
const ModalComponent: React.FC<ModalInterface> = (props: ModalInterface) => {
  const [initialValues] = useState<RegisterFormInterface>({
    address: props.address,
    name: props.name,
    nit: props.nit,
    phone: props.phone,
  });
  const [form, setForm] = useState<RegisterFormInterface>();
  const onSubmit = (body: RegisterFormInterface) => {
    setForm(body);
  };
  return (
    <IonModal {...props}>
      <IonRow>
        <IonCol size="10" offset="1" className="mt-50">
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
                      onClick={() =>
                        props.editClick({
                          address: formikProps.values.address,
                          name: formikProps.values.name,
                          nit: formikProps.values.nit,
                          phone: formikProps.values.phone,
                          id: props.id,
                        })
                      }
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
    </IonModal>
  );
};

export default ModalComponent;
