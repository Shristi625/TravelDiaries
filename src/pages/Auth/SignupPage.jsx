import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call for signup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user data for dashboard
      const userData = {
        name: formData.fullName,
        email: formData.email,
        joinDate: new Date().toISOString().split('T')[0],
        totalTrips: 0, // New user starts with 0 trips
        destinationsVisited: 0, // New user starts with 0 destinations
        totalExpenses: '$0',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        newsletter: formData.newsletter
      };
      
      // Store user data in localStorage
      localStorage.setItem('travelDiariesUser', JSON.stringify(userData));
      
      // Redirect directly to dashboard after successful signup
      navigate('/dashboard');
      
    } catch (error) {
      alert('⚠️ Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Simulate Google signup and redirect to dashboard
    setIsLoading(true);
    
    setTimeout(() => {
      const googleUserData = {
        name: 'Google User',
        email: 'googleuser@example.com',
        joinDate: new Date().toISOString().split('T')[0],
        totalTrips: 1,
        destinationsVisited: 3,
        totalExpenses: '$850',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        newsletter: true
      };
      
      localStorage.setItem('travelDiariesUser', JSON.stringify(googleUserData));
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left section - Nepal travel image */}
        <div className="image-section">
          <div className="image-overlay"></div>
          <div className="image-content">
            <div className="app-brand">
              <div className="compass-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="brand-name">Travel Diaries</span>
            </div>
            <h1 className="image-title">Begin Your Nepal Adventure</h1>
            <p className="image-description">
              Join thousands of travelers sharing their stories from the Himalayas to ancient valleys.
            </p>
            <div className="location-tag">
              <span className="location-icon">📍</span>
              <span className="location-text">Mustang Valley, Nepal</span>
            </div>
            <div className="benefits">
              <div className="benefit">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-icon">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Personal travel journal</span>
              </div>
              <div className="benefit">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-icon">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C21.1 17.1 22 19.5 22 22M2 22C2 19.5 2.9 17.1 4.6 15M19.4 9C21.1 6.9 22 4.5 22 2M2 2C2 4.5 2.9 6.9 4.6 9M16 12C16 14.2 14.2 16 12 16C9.8 16 8 14.2 8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Discover hidden destinations</span>
              </div>
              <div className="benefit">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-icon">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Connect with fellow travelers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Signup form */}
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h1 className="form-title">Join Travel Diaries</h1>
              <p className="form-subtitle">Create your account and start your Nepal journey</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
              </div>

              <div className="password-requirements">
                <p className="requirements-title">Password must contain:</p>
                <ul className="requirements-list">
                  <li className={formData.password.length >= 8 ? 'valid' : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                    One uppercase letter
                  </li>
                  <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                    One number
                  </li>
                </ul>
              </div>

              <div className="form-group">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      I agree to the{' '}
                      <a href="#" className="link">Terms of Service</a> and{' '}
                      <a href="#" className="link">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.acceptTerms && <div className="error-message">{errors.acceptTerms}</div>}
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      Send me travel tips, destination updates, and community stories
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-text">Or sign up with</span>
                <span className="divider-line"></span>
              </div>

              <button
                type="button"
                className="google-button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
              >
                <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>

              <div className="login-link">
                Already have an account?{' '}
                <Link to="/login" className="login-text">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;