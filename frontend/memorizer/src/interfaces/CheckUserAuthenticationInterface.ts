import { UserType } from '../types/UserType';

export interface CheckUserAuthenticationPropsI {
  set_user_info: (data: UserType | null) => void; // Adjust the type as per your set_user_info function
  login: (user: UserType) => void; //
  logout: () => void;
  navigate: (path: string) => void;
}
