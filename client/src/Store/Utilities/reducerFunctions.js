const getIn = (obj, path) => {
    let curObj = obj;

    for (const propName of path) {
        curObj = curObj[propName];
    }

    return curObj;
};

export const setIn = (oldObj, path, val) => {
    if (path.length === 0) return val;

    let curObj = {[path[path.length-1]]: val};

    for (let i = path.length-2; i >= 0; i--) {
        curObj = {[path[i]]: getIn(oldObj, path.slice(0, i+1)), ...curObj};
    }

    return curObj;
};

export const mergeIn = (oldObj, path, val) => {
    const curVal = getIn(oldObj, path);

    if (curVal === undefined) {
        return setIn(oldObj, path, val);
    }

    let mergedVals = {[path[path.length-1]]: {...curVal, ...val}};
    
    return setIn(oldObj, path.slice(0, path.length-1), mergedVals);
};