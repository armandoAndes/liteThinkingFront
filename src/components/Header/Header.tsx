import { IonButton, IonCol, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import { HeaderComponentInterface } from "../../interfaces/Header.interface";
import "./Header.css";

const HeaderComponent: React.FC<HeaderComponentInterface> = ({
  title,
  visible = true,
}) => {
  const history = useHistory();
  const deleteLocal = () => {
    localStorage.clear();
    history.replace("/login");
  };
  return (
    <IonRow>
      {visible && (
        <IonCol size="1" className="margin-header">
          <IonButton onClick={() => deleteLocal()}>Log Out</IonButton>
        </IonCol>
      )}
      <IonCol className="margin-header" size="10">
        <IonItem lines="none" mode="md">
          <IonLabel className="text-center li-lb li-lb-h1">
            {title}
          </IonLabel>
        </IonItem>
      </IonCol>
    </IonRow>
  );
};

export default HeaderComponent;
