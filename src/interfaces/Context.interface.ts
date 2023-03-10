import { LoginFormInterface } from "./LoginForm.interface";
import { RegisterFormInterface } from "./RegisterForm.interface";

export interface ContextInterface {
  user: LoginFormInterface;
  listEnterprises: RegisterFormInterface[];
}
