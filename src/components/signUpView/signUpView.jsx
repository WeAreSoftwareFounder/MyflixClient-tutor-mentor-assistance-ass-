import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SignupView = ({ onSignup }) => {
  const [userData, setUserData] = useState({
    Username: '',
    Password: '', // Corrected field name to match the server
    Email: '',
    birthday: '',
  });
  const [submittedData, setSubmittedData] = useState(null); // Store submitted data
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    // Perform any actions you need after a successful signup, such as redirecting the user or updating the UI.
    // You can also handle state updates here if necessary.
    console.log('User signed up successfully');
    onSignup(); // Call the onSignup function provided as a prop
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (
      userData.Username.trim() === '' ||
      userData.Password.trim() === '' ||
      userData.Email.trim() === ''
    ) {
      setError('Please fill in all required fields.');
      return; // Exit early if validation fails
    }

    // Additional client-side validation (minimum length)
    if (userData.Username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (userData.Email.length < 3) {
      setError('Email must be at least 3 characters long.');
      return;
    }

    try {
      const response = await fetch(
        'https://my-flixs-8361837988f4.herokuapp.com/users',
        {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Signup successful');
        handleSignup(); // Call the handleSignup function after successful signup
        // Note: Avoid storing passwords in client-side state for security reasons.
        // Instead, you should only store non-sensitive data like username, email, etc.
        // You should not include "Password" in the submittedData object.
        const { Username, Email, birthday } = userData;
        setSubmittedData({ Username, Email, birthday });
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while signing up');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* ... Input fields and form controls ... */}
        <button type="submit">Submit</button>
      </form>
      {/* Display submitted data and error messages */}
      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Username: {submittedData.Username}</p>
          <p>Email: {submittedData.Email}</p>
          <p>Birthday: {submittedData.birthday}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

SignupView.propTypes = {
  onSignup: PropTypes.func,
};
export const Signup = SignupView;
