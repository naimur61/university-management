export type ILoginUser = {
  id: string;
  password: string;
  role: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken: string;
  isNeedsChangePass?: boolean;
};
