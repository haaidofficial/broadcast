import { createContext, useContext, useState } from "react";

const RouterContext = createContext();


export function RouterContextProvider({ children }) {

    const [component, setComponent] = useState({ url: '/' });


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