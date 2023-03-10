import * as Yup from "yup";
export const emailFormValidation = Yup.object({
  dest: Yup.string().trim().required("El email es requerido"),
});
