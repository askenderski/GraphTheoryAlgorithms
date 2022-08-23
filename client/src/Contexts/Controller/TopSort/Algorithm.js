import React from "react";
import BasicAlgorithmContext from "../BasicAlgorithmContext";
import algorithm from "../../../Algorithms/General/TopSort/TopSort";
import getController from "../../../Algorithms/General/TopSort/Controller";

const AlgorithmContext = React.createContext();

const OriginalProvider = AlgorithmContext.Provider;

AlgorithmContext.Provider = function({value, children}) {
    const contextValue = {...value, algorithm, getController};

    return (
        <BasicAlgorithmContext.Provider value={contextValue}>
            <OriginalProvider value={contextValue}>
                {children}
            </OriginalProvider>
        </BasicAlgorithmContext.Provider>
    );
};

export default AlgorithmContext;