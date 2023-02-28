import * as Yup from "yup";
export const ItemFormValidation = Yup.object({
  enterprise: Yup.string().trim().required("El enterprise es requerido"),
  name: Yup.string().trim().required("El name es requerido"),
});
