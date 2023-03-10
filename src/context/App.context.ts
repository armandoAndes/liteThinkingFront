import { createContext } from "react";
import { ContextInterface } from "../interfaces/Context.interface";

export const AppContext: React.Context<any> = createContext({} as any);
