import "./RegisForm.scss";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import useAuthApi from "../../../hooks/useAuthApi";
import useUserApi from "../../../hooks/useUserApi";
import { redirect } from "react-router";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRePassword, setErrorRePassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userApi } = useUserApi();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const validate = (value: string) => {
    return value.length > 0;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate(username) ? setErrorUsername(false) : setErrorUsername(true);
    validate(email) ? setErrorEmail(false) : setErrorEmail(true);
    validate(password) ? setErrorPassword(false) : setErrorPassword(true);
    validate(rePassword) && rePassword === password ? setErrorRePassword(false) : setErrorRePassword(true);

    if (errorUsername || errorEmail || errorPassword || errorRePassword) {
      return;
    }

    await userApi.userControllerSignUp({
      appuser_name: username,
      appuser_email: email,
      appuser_password: password
    });

    console.log("got here");
    window.location.replace("/");
  };


  return (
    <>
      <div className="FormBack">
        <h1 className="Title">Registro</h1>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className="Order">

            <TextField
              id="Username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errorUsername}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessibilityNewIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>
          <div className="Order">
            <TextField
              id="Email"
              label="Tu Correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errorEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

          </div>
          <div className="Order">
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errorPassword}
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
          </div>
          <div className="Order">

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirma tu Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                error={errorRePassword}
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
                label="Confirma tu Password"
              />
            </FormControl>
          </div>
          <button className="Button" type="submit">
            Registrarme
          </button>
        </Box>
        <p className="Text">
          Ya tienes una cuenta?{" "}
          <a style={{ textDecoration: "none" }} href="/login">
            Inicia Sesion
          </a>
        </p>
      </div>
    </>
  );
}
