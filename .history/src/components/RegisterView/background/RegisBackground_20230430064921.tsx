import { BackgroundReg, BackgroundImg } from "./BackgroundReg.style";
import "./RegisBackground.scss";

export default function RegisBackground() {
  return (
    <div className="BackgroundReg">
      <img
        className="BackgroundImg"
        src="https://www.ideca.gov.co/sites/default/files/2019-11/Transporte.jpg"
        alt="background"
      />
    </div>
  );
}
