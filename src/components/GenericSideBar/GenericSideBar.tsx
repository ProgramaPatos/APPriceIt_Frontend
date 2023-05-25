import "./GenericSideBar.scss";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

type SideBarContextValue = (e: () => JSX.Element) => void;


const defaultSideBarChild = () => <p>Hola</p>;

export const SideBarContext = createContext<SideBarContextValue>((e) => {});



const GenericSideBar: FC<PropsWithChildren> = ({ children }) => {
    const [Child, setChild] = useState(() => defaultSideBarChild);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <SideBarContext.Provider value={(v) => setChild(() => v)}>
            <div className="SideBar expanded">
                <Child />
            </div>
            {children}
        </SideBarContext.Provider>
    );
}

const TestSideBarConsumer = () => {
    const setChild = useContext(SideBarContext);
    const [counter, setCounter] = useState(0);

    // useEffect(() => {
    //     setChild(() => () => );
    // }, []);
    const handleClick = () => {
        setCounter((v) => v + 1);
        setChild(() => (<div>{counter}</div>));
    }

    return (
        <button onClick={handleClick}>
            click
        </button>
    );
}

export default GenericSideBar;
