import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { ModalErrorInterface } from "../../interfaces/ModalError.interface";
import "./ModalError.scss";
const ModalErrorComponent: React.FC<ModalErrorInterface> = (
  props: ModalErrorInterface
) => {
  const [open, setOpen] = useState<boolean>(props.isOpen);
  return (
    <IonRow>
      <IonCol className="heightModal">
        <IonRow>
          <IonCol size="12">
            <IonItem lines="none" mode="md">
              <IonLabel className="text-center">{props.title}</IonLabel>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem lines="none" mode="md">
              <IonLabel className="text-center">{props.message}</IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonButton
              onClick={() => {
                setOpen(false);
                props.clickEvent();
              }}
            >
              {props.labelButton}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  );
};

export default ModalErrorComponent;
