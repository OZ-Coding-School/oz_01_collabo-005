//user가 로그인하면 들어오는 정보
export type AuthData = {
  first_name: string | null;
  last_name: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  pk: number | null;
} | null;

export type getAuthData = {
  first_name: string;
  last_name: string;
  refreshToken: string;
  accessToken: string;
  pk: Number;
};

export interface UserContextType {
  userInfo: AuthData;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthData>>;
}

export interface FormDataValue {
  name: string;
  description: string;
  category: number | null;
  frequent_place: string;
  age_group: number[];
  image: File | null;
}

//회원가입시 들어가는 정보
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

//마이페이지 수정시 필요한 정보
export interface MyInfoInput {
  nickname: string;
  password1: string;
  password2: string;
  nationality: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  profession: string;
  profile_image: string;
  date_joined: string;
}
