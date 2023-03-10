import * as Yup from "yup";
export const ItemFormValidation = Yup.object({
  name: Yup.string().trim().required("El name es requerido").min(0),
});
