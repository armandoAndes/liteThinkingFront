import * as Yup from "yup";
export const loginFormValidation = Yup.object({
  name: Yup.string().trim().required("El email es requerido"),
  password: Yup.string().trim().required("El password es requerido"),
});
