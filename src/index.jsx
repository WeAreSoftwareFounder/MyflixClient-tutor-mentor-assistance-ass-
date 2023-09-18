import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState } from 'react';
import { ReactDOM } from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Signup } from './components/signupView/signupView';
import { Login } from './components/loginview/loginview';
import { MovieDetails } from './components/movieview/movieview';
import { Movies } from './components/moviecard/moviecard';

const App = () => {
  const [user, setUser] = useState(null); // Add the missing user state variable

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simulate a successful login for demonstration purposes
    // In a real app, you would make an API call to authenticate the user
    if (username === 'Username' && password === 'Password') {
      const loggedInUser = {
        username: '',
        // other user information
      };

      // Call the onLoggedIn function to set the user in the parent component
      onLoggedIn(loggedInUser);

      // Clear the form fields and error message
      setUsername('');
      setPassword('');
      setError('');
    } else {
      // Simulate a login error for demonstration purposes
      setError('Incorrect username or password');
    }
  };

  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            element={<Login onLoggedIn={handleSubmit} />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/movies" element={<Movies />} />
          {/* Add a route for movie details */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
