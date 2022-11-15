import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Messages from './pages/HomePage/Messages/Messages';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      {/* <Route path='/messages' element={<Messages />} /> */}
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default App;
