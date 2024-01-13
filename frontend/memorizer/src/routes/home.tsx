import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkUserAuthentication } from '../utils/checkUserAuthentication';
import { UserInfoAtom } from '../states/userState';
import { useSetAtom } from 'jotai';

export function home() {
  const set_user_info = useSetAtom(UserInfoAtom);
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuthentication({ set_user_info, login, logout, navigate });
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  return <div>Home</div>;
}

export default home;
