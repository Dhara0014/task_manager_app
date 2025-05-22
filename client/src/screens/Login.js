import React, { useState } from 'react';
import { Box, Button, Card, Divider, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import MainComponent from '../components/MainComponent';
import { Link, useNavigate } from 'react-router-dom';
import {authSchema} from '../components/validationScehema/authSchema';
import {postApi} from '../heplers/apiCalls/apis';
import { ToastContainer, toast } from 'react-toastify';
import { setDataToLocal } from '../heplers/storeData/localStrorageData';
import { loginApi } from '../constants/apis';

const userKey = process.env.REACT_APP_SET_AUTH_DATA;

const Login = () => {
    const [data, setData] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateInputs = () => {
        const {error} = authSchema.validate(data, {abortEarly: false});
        if(!error){
            setErrors({});
            return true
        }
        const validationErrors = {};
        error.details.forEach((item) => {
        validationErrors[item.path[0]] = item.message;
        });
    setErrors(validationErrors);
        return false
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(validateInputs()){
            const response = await postApi({
                url: loginApi,
                body: data
            });
            const {status, message, result} = response;
            if(status){
                setDataToLocal(userKey, result)
                toast.success(message);
                navigate('/');
            }else {
                toast.error(message);
            }
        }
    }

    return (
        <MainComponent>
        <ToastContainer />
            <Card variant="outlined" sx={{ width: "30%", gap: "10px", padding: "2rem", borderRadius: "10px" }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(3rem, 10vw, 2.15rem)' }}
                >
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: "2rem" }}
                >

                    <FormControl>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            placeholder="your@email.com"
                            name="email"
                            value={data?.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            autoComplete="email"
                            variant="outlined"
                            error={!!errors?.email}
                            helperText={errors?.email}
                            color={errors?.email ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            variant="outlined"
                            value={data?.password}
                            onChange={(e) => setData({...data, password: e.target.value})}
                            error={!!errors?.password}
                            helperText={errors?.password}
                            color={errors?.password ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                      onClick={validateInputs}
                    >
                        Sign in
                    </Button>
                </Box>
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link to={'/sign-in'}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </MainComponent>
    )
}

export default Login