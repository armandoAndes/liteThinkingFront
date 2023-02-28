import { IonCol, IonItem, IonLabel, IonRow } from "@ionic/react";
import { HeaderComponentInterface } from "../../interfaces/Header.interface";
import "./Header.css";

const HeaderComponent: React.FC<HeaderComponentInterface> = ({ title }) => {
  return (
    <IonRow>
      <IonCol className="margin-header " size="12">
        <IonItem lines="none" mode="md">
          <IonLabel className="text-center li-lb li-lb-h1">{title}</IonLabel>
        </IonItem>
      </IonCol>
    </IonRow>
  );
};

export default HeaderComponent;
