import React from 'react';
import { useUser } from 'reactfire';

import './App.scss';
import AuthPage from './Auth/AuthPage';
import LoggedPage from './Logged/LoggedPage';

function App() {
  const isLoggedUser = useUser();

  return (
    <div className="App">
      {!isLoggedUser && <AuthPage />}
      {isLoggedUser && <LoggedPage />}
    </div>
  );
}

export default App;
