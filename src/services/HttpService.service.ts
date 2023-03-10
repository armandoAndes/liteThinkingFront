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
      return httpClient.post(
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/login" /* http://35.209.157.176:8000/api/user/login - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/login */,
        {
          body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  },
  register: {
    register(newEnterprise: RegisterFormInterface): Promise<any> {
      return httpClient.post(
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/registerEnterprise" /*  http://35.209.157.176:8000/api/enterprises/registerEnterprise - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/registerEnterprise*/,
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
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/registerItem" /*  http://35.209.157.176:8000/api/item/registerEnterprise - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/registerItem*/,
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
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/getItem" /*  http://35.209.157.176:8000/api/item/getItem - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/getItem*/,
        { body: { id } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    updateItem(body: ItemFormInterface): Promise<any> {
      return httpClient.post(
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/updateItem" /*  http://35.209.157.176:8000/api/item/updateItem - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/updateItem*/,
        { body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    deleteItem(body: ItemFormInterface): Promise<any> {
      return httpClient.delete(
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/updateItem" /*  http://35.209.157.176:8000/api/item/updateItem - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/updateItem*/,

        {
          headers: {
            "Content-Type": "application/json",
          },
          data: body,
        }
      );
    },
  },
  listEnterprise: {
    getListEnterprise(): Promise<RegisterFormInterface[]> {
      return httpClient.get(
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/getEnterprises" /*  http://35.209.157.176:8000/api/enterprises/getEnterprises - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/getEnterprises*/,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    deleteEnterprise(id: number): Promise<any> {
      return httpClient.post(
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/deleteEnterprise" /* http://35.209.157.176:8000/api/enterprises/deleteEnterprise - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/deleteEnterprise*/,
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
        "https://us-central1-matig2.cloudfunctions.net/litethinkingfront/updateEnterprise" /*  http://35.209.157.176:8000/api/enterprises/updateEnterprise - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/updateEnterprise*/,
        { body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  },
  email: {
    sendEmail(destiny: string, html: string): Promise<any> {
      return httpClient.post(
        "https://us-central1-matig2.cloudfunctions.net/send-email" /* http://35.209.157.176:8000/api/enterprises/deleteEnterprise - https://us-central1-matig2.cloudfunctions.net/litethinkingfront/deleteEnterprise*/,
        {
          dest: destiny,
          html,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  },
};
