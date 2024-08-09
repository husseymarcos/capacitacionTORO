import React from 'react';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';

const App: React.FC = () => {
  return (
      <div>
        <h1>User Registration and Login</h1>
        <div>
          <h2>Register</h2>
          <RegisterForm />
        </div>
        <div>
          <h2>Login</h2>
          <LoginForm />
        </div>
      </div>
  );
};

export default App;
