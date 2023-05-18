import "./EnableGeolocation.scss";
import paticobuscador from "../../../Img/paticobuscador.png";

export default function EnableGeolocation() {
  return (
    <div className="EnableGeolocationContainer">
      {/* <img src={paticobuscador} alt="" style={{ zIndex: 1 }} /> */}
      <div className="EnableGeolocation">
        {/* <div className="EnableGeolocationIcon"> Aqui va el icono </div> */}
        <div className="EnableGeolocationText">
          <h1> Habilita la geolocalización </h1>
          <p>
            {" "}
            Para poder usar la aplicación, debes habilitar la geolocalización en
            tu navegador{" "}
          </p>
          <p> le meto estilos en la noche jajaja </p>

          <p>
            {" "}
            <a href="https://support.google.com/chrome/answer/142065?hl=es">
              {" "}
              ¿Cómo habilitar la geolocalización en Chrome?{" "}
            </a>{" "}
          </p>
          <p>
            {" "}
            <a href="https://support.mozilla.org/es/kb/como-usar-los-servicios-de-localizacion-en-firefox">
              {" "}
              ¿Cómo habilitar la geolocalización en Firefox?{" "}
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
