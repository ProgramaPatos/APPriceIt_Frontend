import  {FormBack, Title,Text,Order, Button}  from "../styledComponets/RegisterForm" 
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';

import FilledInput from '@mui/material/FilledInput';

import InputLabel from '@mui/material/InputLabel';


import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, OutlinedInput } from "@mui/material";



export default function RegisterForm(){

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    return (
        <>
            <FormBack>
                <Title>Register</Title>
                <Order>
                    <TextField
                        id="Name"
                        label="Tu Nombre"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />

                
           
      
                    <TextField
                        id="Username"
                        label="Username"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccessibilityNewIcon />
                            </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />
        

                </Order> 
                <Order>
           
                    <TextField
                        id="Email"
                        label="Tu Correo"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <EmailIcon />
                            </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />
           
                        <TextField
                        id="Rol"
                        label="Tu Rol"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <WorkIcon/>
                            </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />
           
                    </Order>
                    <Order>
                              
           <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
           

                  
           <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

           
                    </Order>
                    <Button>Registrarme</Button>
                    <Text>Ya tienes una cuenta? <a href="/login">Inicia Sesion</a></Text>
                   
            </FormBack>
        </>
    )
}
