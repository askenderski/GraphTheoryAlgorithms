const getIn = (obj: {[key: string]: any}, path: string[]) => {
    let curObj = obj;

    for (const propName of path) {
        curObj = curObj[propName];
    }

    return curObj;
};

export const setIn = (oldObj: {[key: string]: any}, path: string[], val: any) => {
    if (path.length === 0) return val;

    let curObj = {[path[path.length-1]]: val};

    for (let i = path.length-2; i >= 0; i--) {
        curObj = {[path[i]]: getIn(oldObj, path.slice(0, i+1)), ...curObj};
    }

    return {...oldObj, ...curObj};
};

export const mergeIn = (oldObj: {[key: string]: any}, path: string[], val: any) => {
    const curVal = getIn(oldObj, path);

    if (curVal === undefined) {
        return setIn(oldObj, path, val);
    }

    let mergedVals = {...curVal, ...val};
    
    return setIn(oldObj, path, mergedVals);
};