import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../Router/HomePage';
import { LearnPracticePage } from './LearnPracticePage';
export function RouterComponent() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/learning' element={<LearnPracticePage />}></Route>
      </Routes>
    </>
  );
}
