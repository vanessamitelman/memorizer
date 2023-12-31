import { useSetAtom } from 'jotai';
import { USER_LOCAL_KEY } from './CONST';
import { UserInfoAtom } from '../states/userState';
import { useNavigate } from 'react-router-dom';

export function signOut() {
  const set_user_info = useSetAtom(UserInfoAtom);
  const navigation = useNavigate();
  localStorage.removeItem(USER_LOCAL_KEY);
  set_user_info(null);
  navigation('/login');
}
