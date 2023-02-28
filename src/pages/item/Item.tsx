import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { Form, Formik, useField } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import HeaderComponent from "../../components/Header/Header";
import InputComponent from "../../components/Input/Input";
import { ItemFormValidation } from "../../configs/ItemFormValidations.config";
import { ItemFormInterface } from "../../interfaces/ItemForm.interface";
import { InventoryLabels } from "../../labels/Inventory.labels";
import { ApiClienteMethods } from "../../services/HttpService.service";

const Item: React.FC = () => {
  const [initialValues] = useState<ItemFormInterface>({
    enterprise: "",
    name: "",
  });
  const history = useHistory();
  const [listItems, setItemList] = useState<ItemFormInterface[]>([]);
  const [create, setCreate] = useState<boolean>(false);
  const [form, setForm] = useState<ItemFormInterface>();

  const getList = async () => {
    const resList = await ApiClienteMethods.item.getListItem(
      Number(localStorage.getItem("id"))
    );
    setItemList(resList);
  };
  const onSubmit = (body: ItemFormInterface) => {
    setForm(body);
  };
  const createEnterprise = async (body: ItemFormInterface) => {
    try {
      const res = await ApiClienteMethods.item.registerItem(body);
      history.replace("/list-enterprise");
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    const init = async () => {
      await getList();
    };
    init();
  }, []);
  return (
    <IonPage>
      <HeaderComponent title={InventoryLabels.headerTitle} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="mt-100" size="10" offset="1">
              <IonRow>
                <IonCol size="3">
                  <IonButton
                    onClick={async () => {
                      setCreate(!create);
                      await getList();
                    }}
                  >
                    {create ? "Volver" : "Crear"}
                  </IonButton>
                </IonCol>
              </IonRow>
              {!create && (
                <>
                  <IonRow>
                    <IonCol size="6">
                      <IonItem>
                        <IonLabel className="text-center">Nombre</IonLabel>
                      </IonItem>
                    </IonCol>
                    <IonCol size="6">
                      <IonItem>
                        <IonLabel className="text-center">Empresa</IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  {listItems.length > 0 &&
                    listItems.map((item, index) => {
                      return (
                        <IonRow key={index}>
                          <IonCol size="6">
                            <IonItem>
                              <IonLabel className="text-center">
                                {item.name}
                              </IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol size="6">
                            <IonItem>
                              <IonLabel className="text-center">
                                {item.enterprise}
                              </IonLabel>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      );
                    })}
                  {listItems.length <= 0 && (
                    <IonRow>
                      <IonCol size="12">
                        <IonItem>
                          <IonLabel className="text-center">
                            No hay Items :(
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  )}
                </>
              )}
              {create && (
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values: ItemFormInterface) => {
                    onSubmit(values);
                  }}
                  validationSchema={ItemFormValidation}
                  validateOnChange={true}
                  validateOnBlur={true}
                  validateOnMount={true}
                >
                  {(formikProps) => (
                    <Form>
                      <IonRow>
                        <IonCol size="12">
                          <InputComponent
                            id="inventory"
                            ionLabelPosition="floating"
                            label={InventoryLabels.labelName}
                            type="text"
                            placeholder={InventoryLabels.placeholderName}
                            name="name"
                            value={formikProps.values.name}
                            onIonChange={(e: any) => {
                              formikProps.handleChange(e);
                              formikProps.setTouched({
                                name: true,
                              });
                            }}
                          />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="12">
                          <InputComponent
                            id="login-enterprise"
                            ionLabelPosition="floating"
                            label={InventoryLabels.labelEnterprise}
                            type="text"
                            placeholder={InventoryLabels.placeholderEnterprise}
                            name="enterprise"
                            value={formikProps.values.enterprise}
                            onIonChange={(e: any) => {
                              formikProps.handleChange(e);
                              formikProps.setTouched({
                                enterprise: true,
                              });
                            }}
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
                              createEnterprise({
                                enterprise: formikProps.values.enterprise,
                                name: formikProps.values.name,
                              })
                            }
                          >
                            {InventoryLabels.button}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </Form>
                  )}
                </Formik>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Item;
