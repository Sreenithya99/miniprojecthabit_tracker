import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        navigate('/dashboard');
      } else {
        // Login failed
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="logo">HabitTracker</Link>
        </div>
      </nav>

      <div className="login-form">
        <h2>Login</h2>
        <p>Enter your email and password to access your account</p>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              style={{ backgroundColor: 'white' }}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              style={{ backgroundColor: 'white' }}
              value={formData.password}
              onChange={handleChange}
            />
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;