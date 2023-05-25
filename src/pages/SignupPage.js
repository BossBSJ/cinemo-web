import { Container, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { styled } from "@mui/material/styles";
import Iconify from "../components/iconify";
import { LoadingButton } from "@mui/lab";

const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));


export default function SignupPage(){
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/signin")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
   
    }

    return(
        <Container>
            <StyledContent>
                <Typography variant="h4" gutterBottom>
                    Create account with Cinemo
                </Typography>
                <Typography variant="body2" sx={{ mb: 5 }}>
                    Already have account? {""}
                    <Link variant="subtitle2" component={NavLink} to={'/signin'}>Login</Link>
                </Typography>
                <Stack spacing={3}>
                <TextField name="email" label="Enter your email" onChange={(e) => setEmail(e.target.value)}/>

                <TextField
                name="password"
                label="Create a password"
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

                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit} disabled={!email || !password}>
                    Signup
                </LoadingButton>
            </StyledContent>
        </Container>
    )
}