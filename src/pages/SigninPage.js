import { styled } from "@mui/material/styles";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../components/iconify'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onLogin} disabled={!email || !password}>
        Login
      </LoadingButton>
    </>
  );
}

export default function LoginPage() {

  const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));

  return (
      <Container maxWidth="sm">
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Sign in to Cinemo
          </Typography>

          <Typography variant="body2" sx={{ mb: 5 }}>
            Don’t have an account? {""}
            <Link variant="subtitle2" component={NavLink} to={'/signup'}>Get started</Link>
          </Typography>

          <LoginForm />
        </StyledContent>
      </Container>
  );
}
