import { Box, Button, Card, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import MainComponent from '../components/MainComponent';
import { Link, useNavigate } from 'react-router-dom';
import { signinSchema } from '../components/validationScehema/authSchema';
import { ToastContainer, toast } from 'react-toastify';
import {postApi} from '../heplers/apiCalls/apis';
import { signinApi } from '../constants/apis';


const Signin = () => {
    const [data, setData] = useState({first_name: "", last_name: "", email: "", password: ""});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateInputs = () => {
        const {error} = signinSchema.validate(data, {abortEarly: false});
        if(!error){
            setErrors({});
            return true
        }
        const validationErrors = {};
        error.details.forEach((item) => {
        validationErrors[item.path[0]] = item.message;
        });
        setErrors(validationErrors);
        return false;
    }

        const handleSubmit = async(e) => {
            e.preventDefault();
            if(validateInputs()){
                const response = await postApi({
                    url: signinApi,
                    body: data
                });
                const {status, message, result} = response;
                if(status){
                    toast.success(message);
                    navigate('/login');
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
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: "2rem" }}
                >

                <Typography component='div' sx={{display: "flex", justifyContent: "space-between"}} >
                <FormControl>
                        <TextField
                            required
                            fullWidth
                            id="firstName"
                            name='first_name'
                            label="Frist Name"
                            value={data?.first_name}
                            onChange={(e) => setData({...data, first_name: e.target.value})}
                            // autoComplete=""
                            variant="outlined"
                            error={!!errors?.first_name}
                            helperText={errors?.first_name}
                            color={errors?.first_name ? 'error' : 'primary'}  
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            name='last_name'
                            label="Last Name"
                           value={data?.last_name}
                            onChange={(e) => setData({...data, last_name: e.target.value})}
                            autoComplete=""
                            variant="outlined"
                            error={!!errors?.last_name}
                            helperText={errors?.last_name}
                            color={errors?.last_name ? 'error' : 'primary'}  
                        />
                    </FormControl>
                </Typography>
                    
                    <FormControl>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            placeholder="your@email.com"
                            name="email"
                            autoComplete="email"
                            variant="outlined"
                            value={data?.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
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
                    //   onClick={validateInputs}
                    >
                        Sign up
                    </Button>
                </Box>
                <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link to={'/login'}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                        Sign in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </MainComponent>
    )
}

export default Signin