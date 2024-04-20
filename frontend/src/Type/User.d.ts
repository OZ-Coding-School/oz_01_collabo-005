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

export interface IFormInput {
  email: string;
  password1: string;
  password2: string;
  nickname: string;
  first_name: string;
  last_name: string;
  nationality: string;
  phone: string;
  date_of_birth: Date;
  profession: string;
}
