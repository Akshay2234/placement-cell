import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../images/logo-pc.png';
import image1 from '../images/image1.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username:'',
    fullname: '',
    email: '',
    password: '',
    dob: '',
    contactNumber: '',
    degree: 'Bachelor of Technology',
    course: '',
    yearOfPassing: '',
    cgpa: '',
    twelfthPercentage: '',
    diplomaPercentage: '',
    tenthPercentage: '',
    school12th:'',
    address:'',


    gapYear: '',


    activeBacklogs: '',


    nationality: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    // Password length validation
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post('http://localhost:8000/api/users/sign-up', formData, config);
      const { _id, token, ...rest } = data;
      console.log(data);

      if (_id) {
        localStorage.setItem('userId', _id);
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Registration Successful'); // Show success toast
        navigate('/sign-in');
      } else {
        console.error('User ID is missing in the response');
        toast.error('Registration failed. Please try again.'); // Show error toast
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      toast.error(error.response?.data?.message || 'An error occurred'); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.3,
          zIndex: -2,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: -1,
        }} />
        <Container component='main' maxWidth='md' style={{ width: '70%' }}>
          <CssBaseline />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(34, 34, 34)',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
              color: '#f5f5f5',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            <Avatar style={{ margin: '0px', backgroundColor: '#BB86FC' }}>
              <LockOutlinedIcon />
            </Avatar>
            <img src={logo} className='h-24' alt="Pc logo" style={{ marginBottom: '0px' }} />
            <Typography component='h1' variant='h5' style={{ color: '#BB86FC', fontWeight: 'bold', transition: 'color 0.3s' }}>
              Sign Up
            </Typography>
            <form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '0px'
              }}
              onSubmit={handleSignUp}
            >
              {Object.keys(formData).map((key) => (
  key === 'course' ? (
    <FormControl
      key={key}
      variant="outlined"
      margin="normal"
      required
      style={{
        width: '100%',
        maxWidth: '585px',
        marginBottom: '16px',
        backgroundColor: '#444',
      }}
    >
      <InputLabel style={{ color: '#f5f5f5' }}>Course</InputLabel>
      <Select
        name="course"
        value={formData.course}
        onChange={handleChange}
        style={{ color: '#f5f5f5' }}
        label="Course"
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: '#444',
              color: '#f5f5f5',
            },
          },
        }}
      >
        <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
        <MenuItem value="Information Technology">Information Technology</MenuItem>
        <MenuItem value="Electronics & Communication Engineering">Electronics & Communication Engineering</MenuItem>
        <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
      </Select>
    </FormControl>
  ) : (
    <TextField
      key={key}
      variant='outlined'
      margin='normal'
      required
      style={{
        width: '100%',
        maxWidth: '585px', // Fixed width for text fields
        marginBottom: '16px',
        backgroundColor: '#444',
        color: '#f5f5f5',
        borderColor: '#666',
      }}
      label={key.replace(/([A-Z])/g, ' $1').trim()}
      name={key}
      type={
        key === 'password'
          ? showPassword
            ? 'text'
            : 'password'
          : key === 'dob'
          ? 'date'
          : 'text'
      }
      value={formData[key]}
      onChange={handleChange}
      InputLabelProps={{ style: { color: '#f5f5f5' } }}
      InputProps={
        key === 'password'
          ? {
              style: { color: '#f5f5f5' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    style={{ color: '#f5f5f5', backgroundColor: 'transparent' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : { style: { color: '#f5f5f5' } }
      }
      onFocus={(e) => {
        e.target.style.backgroundColor = '#555';
      }}
      onBlur={(e) => {
        e.target.style.backgroundColor = '#444';
      }}
    />
  )
))}

              <Button
                type='submit'
                fullWidth
                variant='contained'
                style={{
                  margin: '24px 0 16px',
                  background: '#BB86FC',
                  color: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              {error && (
                <Typography variant='body2' color='error' style={{ marginTop: '16px' }}>
                  {error}
                </Typography>
              )}
            </form>
            <div style={{ marginTop: '20px' }}>
              <Typography variant='body2' align='center' style={{ color: '#f5f5f5' }}>
                Already Have an Account?
              </Typography>
            </div>
            <Box mt={3}>
              <Typography variant='body2' align='center'>
                <Link
                  href='/sign-in'
                  style={{
                    color: '#BB86FC',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.background = '#9F62D8';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.color = '#BB86FC';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </div>
        </Container>
      </div>
      <ToastContainer /> {/* Ensure ToastContainer is placed here */}
    </>
  );
};

export default SignUp;
