import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Div from '../components/Div';
import { storeToken } from '../services/config';
import authServices from '../services/auth-services';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const Login = ({ setIsAuthenticatd }) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [loginForm, setLoginForm] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const onSignIn = (e) => {
    setLoading(true);
    authServices.signIn(loginForm).then((data) => {
      storeToken(data?.access_token);
      if (data?.access_token) {
        localStorage.setItem('first_name', data?.user?.first_name);
        setIsAuthenticatd(true);
        setLoading(false);
        navigate('/home');
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    });
  };
  const defaultIfEmpty = (value) => {
    return value === '' ? '' : value;
  };
  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: (theme) => theme.spacing(4),
        mt: 9,
      }}
    >
      <Card sx={{ maxWidth: '100%', width: 360, mb: 4, backgroundColor: '#F5F7FA' }}>
        <Div
          sx={{
            width: '100%',
            mb: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link href='#' underline='none' sx={{ display: 'inline-flex', mt: 1.5 }}>
            <Typography gutterBottom variant='h5' component='div'>
              My-Todos
            </Typography>
          </Link>
        </Div>
        <CardContent sx={{ pt: 0 }}>
          <Div sx={{ mb: 3, mt: 5 }}>
            <TextField
              fullWidth
              name='username'
              label='Username'
              onChange={handleChange}
              value={defaultIfEmpty(loginForm.username || '')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Div>
          <Div sx={{ mb: 2, mt: 1 }}>
            <TextField
              fullWidth
              name='password'
              label='Password'
              onChange={handleChange}
              value={defaultIfEmpty(loginForm.password || '')}
              type={values.showPassword ? 'text' : 'password'}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <BsEyeSlash /> : <BsEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Div>
          <LoadingButton
            fullWidth
            type='submit'
            variant='contained'
            size='large'
            onClick={(e) => onSignIn(e)}
            sx={{ mb: 3 }}
            loading={loading}
            disabled={!loginForm.password || !loginForm.username}
          >
            Login
          </LoadingButton>
          <Typography textAlign={'center'} variant={'body1'} mb={1}>
            Don't have an account?
            <Button variant='text' underline='none' onClick={() => navigate('/signup')}>
              Sign up now
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login;
