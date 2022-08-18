import BasicAlgorithmContext from "../BasicAlgorithmContext";
import {default as algorithmGetter} from "../../../Algorithms/General/TopSort/TopSort";
import {default as controller} from "../../../Algorithms/General/TopSort/Controller";

const AlgorithmContext = {
    Provider: function({value, children}) {
        return (
            <BasicAlgorithmContext.Provider value={{...value, algorithmGetter, controller}}>
                {children}        
            </BasicAlgorithmContext.Provider>
        );
    }
};

export default AlgorithmContext;