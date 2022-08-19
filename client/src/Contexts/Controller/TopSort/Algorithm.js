import React from "react";
import BasicAlgorithmContext from "../BasicAlgorithmContext";
import {default as algorithmGetter} from "../../../Algorithms/General/TopSort/TopSort";
import {default as controller} from "../../../Algorithms/General/TopSort/Controller";

const AlgorithmContext = React.createContext();

const OriginalProvider = AlgorithmContext.Provider;

AlgorithmContext.Provider = function({value, children}) {
    const contextValue = {...value, algorithmGetter, controller};

    return (
        <BasicAlgorithmContext.Provider value={contextValue}>
            <OriginalProvider value={contextValue}>
                {children}
            </OriginalProvider>
        </BasicAlgorithmContext.Provider>
    );
};

export default AlgorithmContext;