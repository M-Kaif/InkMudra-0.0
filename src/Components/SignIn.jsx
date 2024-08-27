import * as React from 'react';
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
import { useState } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    let validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      validationErrors.password = 'Password is required.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate a sign-in success by storing a token in sessionStorage
      sessionStorage.setItem('userToken', 'your-auth-token');
      
      // Redirect to another page after sign-in
      navigate('/'); // Adjust this to the page you want to navigate to after signing in
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
        <Container component="main" maxWidth="xs" className="p-8 backdrop-blur-2xl rounded-lg shadow-lg">
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
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  style: {
                    borderColor: 'black',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'black',
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
                      className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </div>
                  ),
                  style: {
                    borderColor: 'black',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'black',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-black hover:bg-gray-900"
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2" className="text-black">
                    {"Don't have an account? Sign Up"}
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
