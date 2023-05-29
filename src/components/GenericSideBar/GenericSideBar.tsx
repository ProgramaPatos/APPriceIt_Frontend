import "./GenericSideBar.scss";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";

type SideBarContextValue = {
  setSideBar: (e: (() => JSX.Element) | null) => void;
};

const defaultSideBarChild = () => <p>Bienvenido</p>;

export const SideBarContext = createContext<SideBarContextValue>({ setSideBar: (e) => {} });

const GenericSideBar: FC<PropsWithChildren> = ({ children }) => {
  const [Child, setChild] = useState(() => defaultSideBarChild);
  const [open, setOpen] = useState(false);

  const setSideBar: SideBarContextValue["setSideBar"] = useCallback((v) => {
    if (v === null) {
      // console.log("Got here");
      setOpen(false);
    }
    else {
      setOpen(true);
      setChild(() => v);
    }

  }, []);
  return (
    <SideBarContext.Provider value={{ setSideBar }}>
      <div className={`SideBar ${(open ? "expanded" : "collapsed")}`} >
        <div className="panelHeader">
          {open && (
            <button className="ExBurgerButton" onClick={() => { setOpen(false) }}>
              <AiOutlineClose style={{ height: "2.7vh" }} />
            </button>
          )}
        </div>
        <Child />
      </div>
      {children}
    </SideBarContext.Provider >
  );
};


export default GenericSideBar;
