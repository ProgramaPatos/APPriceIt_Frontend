import React, { useState } from "react";
import {
  LoginBack,
  Border,
  Tittle,
  Button,
  Text,
  SimpleSeparator,
} from "./LoginForm.style";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import GitHubIcon from "@mui/icons-material/GitHub";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Border />
      <LoginBack>
        <Tittle>Inicio Sesión</Tittle>
        {/* <Box > */}
        <div>
          <TextField
            id="Name"
            label="Tu Nombre"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <AccountCircle />{" "}
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <div className="SimpleSeparator"></div>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
          <SimpleSeparator />
          <Button type="submit">Iniciar</Button>
          <SimpleSeparator />
          <Button>
            <GitHubIcon /> Iniciar con GitHub
          </Button>
        </div>
        {/* </Box> */}
        <SimpleSeparator />
        <Text>
          ¿No tienes una cuenta? <a href="/register">Registrate</a>
        </Text>
      </LoginBack>
    </>
  );
}
