import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import GitHubIcon from "@mui/icons-material/GitHub";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, OutlinedInput } from "@mui/material";
import "./LoginForm.scss";
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
      <div className="Border" />
      <div className="LoginBack">
        <h1 className="Tittle">Inicio Sesión</h1>
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
          <div className="SimpleSeparator" />
          <button className="Button" type="submit">
            Iniciar
          </button>
          <div className="SimpleSeparator" />
          <button className="Button">
            <GitHubIcon /> Iniciar con GitHub
          </button>
        </div>
        {/* </Box> */}
        <div className="SimpleSeparator" />
        <p className="Text">
          ¿No tienes una cuenta? <a href="/register">Registrate</a>
        </p>
      </div>
    </>
  );
}
