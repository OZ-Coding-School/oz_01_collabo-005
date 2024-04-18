import { Dispatch, SetStateAction } from "react";

export interface UserInfo {
  first_name: string | null;
  last_name: string | null;
}

export interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: SetStateAction<UserInfo>;
}

export interface FormDataValue {
  name: string;
  description: string;
  category: number | null;
  frequent_place: string;
  age_group: number[];
  image: File | null;
}
