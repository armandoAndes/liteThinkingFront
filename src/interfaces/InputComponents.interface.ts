export interface InputComponentInterface {
  type: "text" | "number" | "email" | "password" | "tel";
  label: string;
  id: string;
  min?: string | number;
  max?: string | number;
  placeholder: string;
  ionLabelPosition: "floating" | "fixed" | "stacked";
  [x: string]: any;
}
