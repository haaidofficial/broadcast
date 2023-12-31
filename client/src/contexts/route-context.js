import { createContext, useContext, useState, useEffect } from "react";

const RouterContext = createContext();


export function RouterContextProvider({ children }) {

    const [component, setComponent] = useState({ url: window.location.search });


    useEffect(() => {

        console.log(window.location.search);

    }, [window.location.search]);



    function updateComponentView(url) {
        setComponent({ url });
    }


    const RouterContextValues = {
        component,
        updateComponentView,
    };

    return <RouterContext.Provider value={RouterContextValues}>
        {children}
    </RouterContext.Provider>
}


export function useRouterContext() {
    return useContext(RouterContext);
}