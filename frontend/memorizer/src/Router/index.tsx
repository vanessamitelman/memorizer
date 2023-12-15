import { Route, Routes } from 'react-router-dom';

export function RouterComponent() {
  return (
    <>
      <Routes>
        <Route path='/' element={<div>Hello</div>}></Route>
      </Routes>
    </>
  );
}
