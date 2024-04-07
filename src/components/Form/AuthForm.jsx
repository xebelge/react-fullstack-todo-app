import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validation/form-validation';
import { register, login } from '../../services/auth/auth-service';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import './auth-form.css';
import TextFieldComponent from '../TextField/TextFieldComponent';

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const action = isLogin ? login : register;
        await action(values.email, values.password);
        alert('Authentication successful, redirecting to Todos page!');
        props.onLogin(values.email, values.password);
        if (!isLogin) setIsLogin(true);
      } catch (error) {
        if (error.code === 'auth/invalid-credential') {
          setErrorMessage('Invalid email or password. Please try again.');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='auth-email-input'>
          <TextFieldComponent
            label="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            type="email"
            variantType="outlined"
            id="email"
            isFullWidth
          />
          {formik.touched.email && formik.errors.email && <Alert severity="error">{formik.errors.email}</Alert>}
        </div>
        <div>
          <TextFieldComponent
            label="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            variantType="outlined"
            id="password"
            isFullWidth
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </div>
        {formik.touched.password && formik.errors.password && <Alert severity="error" className="form-error">{formik.errors.password}</Alert>}
        {errorMessage && <Alert severity="error" className="error-message">{errorMessage}</Alert>}
        <Button type="submit" variant="contained" className="submit-btn" fullWidth>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <Button onClick={() => setIsLogin(!isLogin)} className="toggle-btn" fullWidth>
        {isLogin ? 'Need to create an account?' : 'Already have an account?'}
      </Button>
    </div>
  );
};

export default AuthForm;
