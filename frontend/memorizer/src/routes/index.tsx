import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LearnPracticePage } from './learnPracticePage';
import { Dashboard } from './dashboard';
import { SignUp } from './auth/signUp';
import { Login } from './auth/login';
import { useSetAtom } from 'jotai';
import { UserInfoAtom } from '../states/userState';
import { useEffect } from 'react';
import { USER_LOCAL_KEY } from '../utils/CONST';
import { UserTypeZod } from '../types/userType';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Home from './home';

export function RouterComponent() {
  const set_user_info = useSetAtom(UserInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user_str = localStorage.getItem(USER_LOCAL_KEY);
    if (user_str === null) {
      if (location.pathname === '/login') return;
      return navigate('/sign-up');
    }
    if (user_str.length === 0 && location.pathname !== '/login')
      return navigate('/sign-up');

    const user_obj_zod = UserTypeZod.safeParse(JSON.parse(user_str));
    if (user_obj_zod.success) {
      set_user_info(user_obj_zod.data);
      if (location.pathname === '/sign-up' || location.pathname === '/login') {
        navigate('/dashboard');
      }
      return;
    }
    localStorage.removeItem(USER_LOCAL_KEY);
    navigate('/sign-up');
  }, [location.pathname]);
  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <PrivateRoute
              path='/dashboard'
              element={<Dashboard />}
              requiredRoles={['admin' || 'user']}
            />
          }
        >
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />

        <Route path='/learning' element={<LearnPracticePage />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
      </Routes>
    </AuthProvider>
  );
}
