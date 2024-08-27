import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signupbook from '../assets/signupbook.jpg';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const navigate = useNavigate();

  const validateName = (name) => /^[A-Za-z]+$/.test(name);

  const validateEmail = (email) => {
    if (!email) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const restrictedDomains = ['.co', '.c', '.org', '.net'];

    if (!emailRegex.test(email)) {
      return false;
    }

    const emailDomain = email.substring(email.lastIndexOf('.'));
    return !restrictedDomains.includes(emailDomain) || email.endsWith('.com');
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!firstName) {
      validationErrors.firstName = 'First name is required.';
    } else if (!validateName(firstName)) {
      validationErrors.firstName = 'First name should only contain letters.';
    }

    if (!lastName) {
      validationErrors.lastName = 'Last name is required.';
    } else if (!validateName(lastName)) {
      validationErrors.lastName = 'Last name should only contain letters.';
    }

    if (!email) {
      validationErrors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address (e.g., ending in .com).';
    }

    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 8 characters long and include both letters and numbers.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      sessionStorage.setItem('userToken', 'your-auth-token');
      sessionStorage.setItem('userName', `${firstName} ${lastName}`);
      navigate('/');
    } else {
      setShowAlert(true); 
    }
  };

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${signupbook})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          className="p-8 backdrop-blur-2xl rounded-lg shadow-lg"
        >
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="font-bold">
              Sign up
            </Typography>

            
            {showAlert && (
              <Alert severity="warning" onClose={() => setShowAlert(false)} sx={{ width: '100%', mt: 2 }}>
                Please correct the highlighted errors and try again.
              </Alert>
            )}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    sx={{
                      borderColor: 'black',
                    }}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) {
                        setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
                      }
                    }}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    className="focus:border-black"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) {
                        setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
                      }
                    }}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                      }
                    }}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
                      }
                    }}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ marginRight: 8 }}
                          className="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </div>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-black hover:bg-gray-900"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signin" variant="body2" className="text-black">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
