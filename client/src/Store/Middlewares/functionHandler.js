export const functionStore = {
    invalidateAlgorithm: ()=>{}
};

export const functionHandler = store => next => action => {
    switch(action.type){ 
        case 'algorithm/setInvalidateAlgorithm':
        functionStore.invalidateAlgorithm = action.payload;
    }
    
    return next({type: action.type});
};