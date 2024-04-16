import { createContext } from "react";
import { UserContextType } from "../Type/User";

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
