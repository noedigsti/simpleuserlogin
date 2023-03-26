// App.tsx
import React from 'react';
import { LoginForm } from './UserForm';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './userSlice';
import axios from 'axios';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: any) => state.user.loggedIn);
  const username = useSelector((state: any) => state.user.username);

  const handleLogin = async (username: string, password: string) => {
    try {
      await axios.post('http://localhost:5555/login', { username, password });
      dispatch(login(username));
    } catch (error) {
      console.error('Unauthorized');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>Welcome, {username}! You are logged in.</div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
