import { Dispatch, SetStateAction } from "react";

export interface LoginUserInfo {
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}
