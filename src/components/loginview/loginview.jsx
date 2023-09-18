import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    try {
      const response = await fetch(
        'https://my-flixs-8361837988f4.herokuapp.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Handle successful login, e.g., redirect to another page
        console.log('Login successful');
        const user = await response.json();
        onLoggedIn(user, user.token);
      } else {
        // Handle login failure, e.g., display an error message
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
export const Login = LoginView;
