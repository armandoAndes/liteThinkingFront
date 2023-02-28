import * as Yup from "yup";
export const registerFormValidation = Yup.object({
  name: Yup.string().trim().required("El nombre es requerido"),
  address: Yup.string().trim().required("La dirección es requerido"),
  nit: Yup.string().trim().required("La dirección es requerido"),
  phone: Yup.string().required("La dirección es requerido"),
});
