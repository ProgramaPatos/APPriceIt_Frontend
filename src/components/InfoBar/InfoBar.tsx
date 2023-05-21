import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import "./InfoBar.scss";
interface InfoCardProps {
  coord: string;
  viewPanel: boolean;
  setViewPanel: (value: boolean) => void;
}
export function InfoBar({ coord, viewPanel, setViewPanel }: InfoCardProps) {
  const [isOPen, setIsOpen] = useState<boolean>(false);
  const handleClick = (): void => {
    setIsOpen(!isOPen);
    setViewPanel(false);
  };
  return (
    <div
      className={`InfoDisplay ${
        isOPen || viewPanel ? "expanded" : "collapsed"
      }`}
    >
      <div className="InfoBurgerButton">
        <button className="BurgerButton" onClick={handleClick}>
          {isOPen || viewPanel ? (
            <AiOutlineClose style={{ height: "2.7vh", width: "100%" }} />
          ) : (
            <HiMenu style={{ height: "2.7vh", width: "100%" }} />
          )}
        </button>
      </div>
      {isOPen || viewPanel ? (
        <div>
          <h1> {coord} </h1>
        </div>
      ) : null}
    </div>
  );
}
