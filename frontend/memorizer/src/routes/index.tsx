import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LearnPracticePage } from './learnPracticePage';
import { Dashboard } from './dashboard';
import { SignUp } from './auth/signUp';
import { Login } from './auth/login';
import { useEffect } from 'react';

import Home from './home';
import { checkUserAuthentication } from '../utils/checkUserAuthentication';
import { useSetAtom } from 'jotai';
import { UserInfoAtom } from '../states/userState';
import { useAuth } from '../context/AuthContext';

export function RouterComponent() {
  const location = useLocation();
  const set_user_info = useSetAtom(UserInfoAtom);
  const { login, logout } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    checkUserAuthentication({ set_user_info, login, logout, navigate });
  }, [location.pathname]);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route path='learning' element={<LearnPracticePage />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />}></Route>
    </Routes>
  );
}
