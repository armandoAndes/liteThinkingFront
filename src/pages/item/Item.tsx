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
  useIonViewWillEnter,
} from "@ionic/react";
import { Form, Formik, useField } from "formik";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import HeaderComponent from "../../components/Header/Header";
import InputComponent from "../../components/Input/Input";
import ModalErrorComponent from "../../components/ModalError/ModalError";
import { ItemFormValidation } from "../../configs/ItemFormValidations.config";
import { ItemFormInterface } from "../../interfaces/ItemForm.interface";
import { ModalErrorInterface } from "../../interfaces/ModalError.interface";
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
  const [edit, setEdit] = useState<boolean>(false);
  const [form, setForm] = useState<ItemFormInterface>();
  const [update, setUpdate] = useState<ItemFormInterface>({
    enterprise: "",
    name: "",
  });
  let formikRef = useRef<any>();
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
  const deleteItem = async (item: ItemFormInterface) => {
    try {
      await ApiClienteMethods.item.deleteItem(item);
      await getList();
      setCreate(false);
      setEdit(false);
    } catch (e: any) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e.response.data.message}`,
        title: "Error borrando item",
        clickEvent: clickModal,
      });
    }
  };
  const editItem = async (item: ItemFormInterface) => {
    try {
      await ApiClienteMethods.item.updateItem(item);
      await getList();
      setCreate(false);
      setEdit(false);
      history.push("/register-product");
    } catch (e: any) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e.response.data.message}`,
        title: "Error actualizando item",
        clickEvent: clickModal,
      });
    }
  };
  const getList = async () => {
    console.warn("LLAMADA GET LIST");
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
      setCreate(false);
      setEdit(false);
      await getList();
    } catch (e: any) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e.response.data.message}`,
        title: "Error registrando item",
        clickEvent: clickModal,
      });
    }
  };
  useIonViewWillEnter(() => {
    const init = async () => {
      await getList();
    };
    init();
  });
  useEffect(() => {
    if (formikRef.current && edit) {
      formikRef.current.setFieldValue("name", update.name);
    }
  }, [update]);
  return (
    <IonPage>
      <HeaderComponent title={InventoryLabels.headerTitle} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="mt-100" size="10" offset="1">
              <IonRow>
                <IonCol size="3">
                  {
                    <IonButton
                      onClick={async () => {
                        setCreate(false);
                        setEdit(false);
                        history.replace("/list-enterprise");
                      }}
                    >
                      {"Volver Lista"}
                    </IonButton>
                  }
                  <IonButton
                    onClick={async () => {
                      setCreate(true);
                      setEdit(false);
                    }}
                  >
                    {"Crear"}
                  </IonButton>
                </IonCol>
              </IonRow>
              {!create && !edit && (
                <>
                  <IonRow>
                    <IonCol size="6">
                      <IonItem>
                        <IonLabel className="text-center">
                          Nombre Producto
                        </IonLabel>
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
                          <IonCol size="3">
                            <IonButton
                              onClick={() => {
                                setEdit(true);
                                setCreate(false);
                                setUpdate(item);
                              }}
                            >
                              Editar
                            </IonButton>
                          </IonCol>
                          <IonCol size="3">
                            <IonButton onClick={() => deleteItem(item)}>
                              Borrar
                            </IonButton>
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
              {
                /* (create || edit) && */ <Formik
                  
                  initialValues={initialValues}
                  onSubmit={(values: ItemFormInterface) => {
                    onSubmit(values);
                  }}
                  validationSchema={ItemFormValidation}
                  validateOnChange={true}
                  validateOnBlur={true}
                  validateOnMount={true}
                  initialTouched={true}
                  innerRef={formikRef}
                >
                  {(formikProps) => (
                    <Form>
                      <IonRow className={edit || create ? "visible-on" : "visible-off"}>
                        <IonCol size="12">
                          <InputComponent
                            id="inventory"
                            ionLabelPosition="floating"
                            label={InventoryLabels.labelName}
                            type="text"
                            placeholder={InventoryLabels.placeholderName}
                            name="name"
                            min={1}
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
                      <IonRow  className={edit || create ? "visible-on" : "visible-off"}>
                        <IonCol size="12">
                          <IonButton
                            disabled={!formikProps.isValid}
                            color="primary"
                            mode="md"
                            onClick={() => {
                              if (!edit) {
                                createEnterprise({
                                  enterprise: localStorage.getItem("id") || "1",
                                  name: formikProps.values.name,
                                });
                              } else {
                                formikProps.setFieldValue("name", update.name);
                                editItem({
                                  enterprise: localStorage.getItem("id") || "1",
                                  name: formikProps.values.name,
                                  id: update.id,
                                });
                              }
                            }}
                          >
                            {edit ? "Editar" : InventoryLabels.button}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </Form>
                  )}
                </Formik>
              }
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

export default Item;
