import React, { useState } from 'react'
import { LoginBack, Border, Tittle , Button , Text, SimpleSeparator } from '../styledComponets/LoginForm';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import InputLabel from '@mui/material/InputLabel';
import GitHubIcon from '@mui/icons-material/GitHub';


import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, OutlinedInput } from "@mui/material";
import { Box } from '@mui/system';


export default function LoginForm(){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };


    return (
        <>
        <Border/>
           <LoginBack>
                <Tittle>Inicio Sesión</Tittle>
                <Box >
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
                <SimpleSeparator>
                </SimpleSeparator> 


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
                <SimpleSeparator/>
                <Button type="submit">Iniciar</Button>

                <Button><GitHubIcon/> Iniciar con GitHub
                    </Button>
                </Box>
                <SimpleSeparator/>
                <Text>¿No tienes una cuenta? <a href="/register">Registrate</a></Text>
           </LoginBack> 

        </>
    )
}
