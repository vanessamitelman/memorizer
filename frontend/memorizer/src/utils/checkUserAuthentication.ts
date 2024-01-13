import { USER_LOCAL_KEY } from './CONST';
import { UserTypeZod } from '../types/UserType';
import { CheckUserAuthenticationPropsI } from '../interfaces/CheckUserAuthenticationInterface';

export function checkUserAuthentication(props: CheckUserAuthenticationPropsI) {
  const { set_user_info, login, logout, navigate } = props;
  const user_str = localStorage.getItem(USER_LOCAL_KEY);
  if (user_str === null) {
    logout();
    if (location.pathname === '/login') return;
    return navigate('/sign-up');
  }
  if (user_str.length === 0 && location.pathname !== '/login')
    return navigate('/sign-up');

  const user_obj_zod = UserTypeZod.safeParse(JSON.parse(user_str));

  if (user_obj_zod.success) {
    set_user_info(user_obj_zod.data);
    login(user_obj_zod.data);
    if (location.pathname === '/sign-up' || location.pathname === '/login') {
      navigate('/dashboard');
    }
    return;
  }
  localStorage.removeItem(USER_LOCAL_KEY);
  navigate('/sign-up');
}
