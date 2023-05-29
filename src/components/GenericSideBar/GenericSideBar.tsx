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
      console.log("Got here");
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
        <Child />
      </div>
      {children}
    </SideBarContext.Provider >
  );
};


export default GenericSideBar;
