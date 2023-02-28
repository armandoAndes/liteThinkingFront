import { IonCol, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useField } from "formik";
import { InputComponentInterface } from "../../interfaces/InputComponents.interface";
import "./Input.css";

const InputComponent: React.FC<InputComponentInterface> = (
  props: InputComponentInterface
) => {
  const [field, meta] = useField(props as any);
  return (
    <IonRow>
      <IonCol size="12">
        <IonItem lines="none" mode="md">
          <IonLabel>{props.label}</IonLabel>
          <IonInput className="border" {...props}></IonInput>
        </IonItem>
        {meta.error && <h6 className="li-lb li-lb-error">{meta.error}</h6>}
      </IonCol>
    </IonRow>
  );
};

export default InputComponent;
