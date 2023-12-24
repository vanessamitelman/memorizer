import { Route, Routes } from 'react-router-dom';

import { LearnPracticePage } from './learnPracticePage';
import { LoginPage } from './loginPage';
import { AccountPage } from './accountPage';
import { HomePage } from './homePage';
export function RouterComponent() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/learning' element={<LearnPracticePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/create-account' element={<AccountPage />}></Route>
      </Routes>
    </>
  );
}
