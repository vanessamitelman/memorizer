import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LearnPracticePage } from './learnPracticePage';
import { HomePage } from './homePage';
import { SignUp } from './auth/signUp';
import { LoginPage } from './auth/login';
import { useSetAtom } from 'jotai';
import { UserInfoAtom } from '../states/userState';
import { useEffect } from 'react';
import { USER_LOCAL_KEY } from '../utils/CONST';
import { UserTypeZod } from '../types/userType';

export function RouterComponent() {
  const set_user_info = useSetAtom(UserInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user_str = localStorage.getItem(USER_LOCAL_KEY);

    if (user_str === null || user_str.length === 0) return navigate('/sign-up');
    const user_obj_zod = UserTypeZod.safeParse(JSON.parse(user_str));

    if (user_obj_zod.success) {
      set_user_info(user_obj_zod.data);
      if (location.pathname === '/sign-up' || location.pathname === '/login') {
        navigate('/');
      }
      return;
    }
    localStorage.removeItem(USER_LOCAL_KEY);
    navigate('/sign-up');
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='/learning' element={<LearnPracticePage />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='login' element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}
