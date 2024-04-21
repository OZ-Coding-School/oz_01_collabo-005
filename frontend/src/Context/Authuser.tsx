import { createContext } from "react";
import { UserContextType } from "../Type/User";

let UserContext = createContext<UserContextType | null>(null);

export default UserContext;
