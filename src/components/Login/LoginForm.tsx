import React, { FormEventHandler, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import "./LoginForm.scss";
import useUser from "../../hooks/useUser";
import { AuthStatus } from "../../types/user";

type LoginInputFieldProps = TextFieldProps & { endIcon: React.ReactNode };

const LoginInputField: React.FC<LoginInputFieldProps> = (props) => {
  const { id, label, value, onChange, endIcon, ...other } = props;
  return (
    <TextField
      id={id}
      label={label}
      required={true}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        )
      }}
      variant="outlined"
      {...other}
    />
  );
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const { signIn, userStatus, hasAuthError } = useUser();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (username && password) {
      signIn({ userName: username, password: password });
    }

  }

  return (
    <>
      <div className="Border" />
      <div className="LoginBack">
        <h1 className="Tittle">Inicio Sesión</h1>
        {/* <Box > */}
        <div>
          <form onSubmit={handleSubmit}>
            <LoginInputField
              id="Name"
              label="Tu Nombre"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              endIcon={(
                // TODO: this should not be a button
                // but the style achieved by edge="end"
                // isn't available with <Icon>
                <IconButton
                  edge="end"
                  disabled={true}
                >
                  <AccountCircle />
                </IconButton>
              )}
            />
            <div className="SimpleSeparator"></div>
            <LoginInputField
              id="password"
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endIcon={(
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
              type={showPassword ? "text" : "password"}
            />

            <div className="SimpleSeparator" />
            {(userStatus === AuthStatus.LOGGING_IN) && (<strong>Cargando...</strong>)}
            {hasAuthError && (<strong>Error de autenticación</strong>)}
            <button className="Button" type="submit">
              Iniciar
            </button>
          </form>
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
