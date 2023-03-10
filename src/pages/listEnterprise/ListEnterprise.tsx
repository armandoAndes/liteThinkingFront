import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonModal,
  IonPage,
  IonRow,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useContext, useEffect, useRef, useState } from "react";

import HeaderComponent from "../../components/Header/Header";
import ModalComponent from "../../components/Modal/Modal";
import { RegisterFormInterface } from "../../interfaces/RegisterForm.interface";
import { ApiClienteMethods } from "../../services/HttpService.service";
import { useHistory } from "react-router";
import { LoginEnum } from "../../enums/login.enum";
import ModalErrorComponent from "../../components/ModalError/ModalError";
import { ModalErrorInterface } from "../../interfaces/ModalError.interface";
import { AppContext } from "../../context/App.context";

const ListEnterprise: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { appContextValue, setAppContext } = useContext(AppContext);

  const history = useHistory();
  const [listEnterprises, setListEnterprises] = useState<
    RegisterFormInterface[]
  >([]);
  const [present, dismiss] = useIonLoading();
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
  const [message, setMessage] = useState("Hola");
  const [user] = useState<any>(JSON.parse(localStorage.getItem("user")!));
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 5,
    },
  });
  const goRegister = () => {
    history.push("/register");
  };
  const editEnterprise = async (enterprise: RegisterFormInterface) => {
    try {
      const res = await ApiClienteMethods.listEnterprise.updateEnterprise(
        enterprise
      );
      await getList();
    } catch (e) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e}`,
        title: "Error updateEnterprise",
        clickEvent: clickModal,
      });
    }
  };
  const deleteEnterprise = async (id: number) => {
    try {
      const res = await ApiClienteMethods.listEnterprise.deleteEnterprise(id);
      await getList();
    } catch (e) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e}`,
        title: "Error borrando empresa",
        clickEvent: clickModal,
      });
    }
  };
  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  };
  const getList = async () => {
    try {
      setListEnterprises(
        await ApiClienteMethods.listEnterprise.getListEnterprise()
      );
    } catch (e) {
      setErrorBody({
        isOpen: true,
        labelButton: "Cerrar",
        message: `${e}`,
        title: "Error al obtener empresa",
        clickEvent: clickModal,
      });
    }
  };
  const goItems = (id: number) => {
    localStorage.setItem("id", id.toString());
    history.push("/register-product");
  };
  useEffect(() => {
    const init = async () => {
      await getList();
    };
    init();
  }, []);
  const sendEmail = () => {
    setAppContext({
      ...appContextValue,
      listEnterprises: listEnterprises,
    });
    history.replace("/email");
  };
  const PDFEnterprise = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ textAlign: "center" }}>Empresas</Text>
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            {listEnterprises.map((enterprise) => {
              return `Nombre: ${enterprise.name}  Nit: ${enterprise.nit} Dirección:  ${enterprise.address} Teléfono:  ${enterprise.phone} \n`;
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <IonPage>
      <HeaderComponent title={"Lista de empresas"} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol
              className="mt-100"
              sizeXs="12"
              sizeMd="10"
              offsetXs="0"
              offsetMd="1"
            >
              <IonRow>
                <IonCol size="1" sizeXs="3">
                  <IonButton onClick={() => history.replace("/login")}>
                    Atrás
                  </IonButton>
                </IonCol>
                <IonCol size="1" sizeXs="3">
                  <IonButton onClick={() => sendEmail()}>
                    Enviar Email
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <PDFDownloadLink
                    document={<PDFEnterprise />}
                    fileName={`enterprise${new Date().getUTCDate()}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Descargar empresas"
                    }
                  </PDFDownloadLink>
                </IonCol>
                {user.roleUser === LoginEnum.roleAdmin && (
                  <IonCol sizeMd="4" sizeXs="12">
                    <IonButton onClick={() => goRegister()}>
                      Agregar Empresa
                    </IonButton>
                  </IonCol>
                )}
              </IonRow>
              {listEnterprises.length > 0 &&
                listEnterprises.map((enterprise, index) => {
                  return (
                    <IonRow className="container" key={index}>
                      <IonCol
                        className="text-center border-list container"
                        sizeMd="2"
                        sizeXs="12"
                      >
                        {enterprise.name}
                      </IonCol>
                      <IonCol
                        className="text-center border-list container"
                        sizeMd="2"
                        sizeXs="12"
                      >
                        {enterprise.address}
                      </IonCol>
                      <IonCol
                        className="text-center border-list container"
                        sizeMd="2"
                        sizeXs="12"
                      >
                        {enterprise.nit}
                      </IonCol>
                      <IonCol
                        className="text-center border-list container"
                        sizeMd="2"
                        sizeXs="12"
                      >
                        {enterprise.phone}
                      </IonCol>
                      {user.roleUser === LoginEnum.roleAdmin && (
                        <>
                          <IonCol
                            className="text-center"
                            sizeMd="2"
                            sizeXs="12"
                          >
                            <ModalComponent
                              key="modal"
                              modal={modal}
                              trigger={`open-modal${index}`}
                              address={enterprise.address}
                              name={enterprise.name}
                              nit={enterprise.nit}
                              phone={enterprise.phone}
                              id={enterprise.id}
                              editClick={editEnterprise}
                              onWillDismiss={(ev: any) => onWillDismiss(ev)}
                            />
                            <IonButton id={`open-modal${index}`}>
                              Editar
                            </IonButton>
                            <IonButton onClick={() => goItems(enterprise.id!)}>
                              Productos
                            </IonButton>
                          </IonCol>
                          <IonCol
                            className="text-center"
                            sizeMd="2"
                            sizeXs="12"
                          >
                            <IonButton
                              onClick={() => deleteEnterprise(enterprise.id!)}
                            >
                              Eliminar
                            </IonButton>
                          </IonCol>
                        </>
                      )}
                    </IonRow>
                  );
                })}
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

export default ListEnterprise;
