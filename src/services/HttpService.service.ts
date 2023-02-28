import axios from "axios";
import { ItemFormInterface } from "../interfaces/ItemForm.interface";
import { LoginFormInterface } from "../interfaces/LoginForm.interface";
import { RegisterFormInterface } from "../interfaces/RegisterForm.interface";

const httpClient = axios.create();
httpClient.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const ApiClienteMethods = {
  
  login: {
    auth(body: LoginFormInterface): Promise<any> {
      return httpClient.post("http://localhost:8000/api/user/login", {
        body
      });
    },
  },
  register: {
    register(newEnterprise: RegisterFormInterface): Promise<any> {
      return httpClient.post(
        "http://localhost:8000/api/enterprises/registerEnterprise",
        { data: newEnterprise },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  },
  item: {
    registerItem(newItem: ItemFormInterface): Promise<any> {
      return httpClient.post(
        "http://localhost:8000/api/item/registerItem",
        { data: newItem },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    getListItem(id: number): Promise<ItemFormInterface[]> {
      return httpClient.post(
        "http://localhost:8000/api/item/getItem",
        { body: { id } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    updateEnterprise(body: ItemFormInterface): Promise<any> {
      return httpClient.post(
        "http://localhost:8000/api/item/updateItem",
        { body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  },
  listEnterprise: {
    getListEnterprise(): Promise<RegisterFormInterface[]> {
      return httpClient.get(
        "http://localhost:8000/api/enterprises/getEnterprises",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    deleteEnterprise(id: number): Promise<any> {
      return httpClient.delete(
        "http://localhost:8000/api/enterprises/deleteEnterprise",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id,
          },
        }
      );
    },
    updateEnterprise(body: RegisterFormInterface): Promise<any> {
      return httpClient.post(
        "http://localhost:8000/api/enterprises/updateEnterprise",
        { body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  },
};
