import {
  FormBack,
  Title,
  Text,
  Order,
  Button,
} from "../../styledComponets/RegisterForm.style.tsx";
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

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorRol, setErrorRol] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRePassword, setErrorRePassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const validate = (value: string) => {
    return value.length > 0;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate(name) ? setErrorName(false) : setErrorName(true);
    validate(username) ? setErrorUsername(false) : setErrorUsername(true);
    validate(email) ? setErrorEmail(false) : setErrorEmail(true);
    validate(rol) ? setErrorRol(false) : setErrorRol(true);
    validate(password) ? setErrorPassword(false) : setErrorPassword(true);
    validate(rePassword) ? setErrorRePassword(false) : setErrorRePassword(true);
  };

  return (
    <>
      <FormBack>
        <Title>Registro</Title>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Order>
            <TextField
              id="Name"
              label="Tu Nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errorName}
              // required = {true}
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
          </Order>
          <Order>
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

            <TextField
              id="Rol"
              label="Tu Rol"
              type="text"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              error={errorRol}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Order>
          <Order>
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
          </Order>
          <Button type="submit">Registrarme</Button>
        </Box>
        <Text>
          Ya tienes una cuenta?{" "}
          <a style={{ textDecoration: "none" }} href="/login">
            Inicia Sesion
          </a>
        </Text>
      </FormBack>
    </>
  );
}
