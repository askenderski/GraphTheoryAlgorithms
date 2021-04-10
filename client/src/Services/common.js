// export const baseUrl = "https://graph-theory-algorithms.herokuapp.com";
export const baseUrl = "http://localhost:5000";

export const articles = {
    base: `${baseUrl}/articles`
};

export const graphs = {
    base: `${baseUrl}/graphs`
};

export const auth = (function(){
    let auth = {base: `${baseUrl}/auth`};

    auth = {...auth, login: `${auth.base}/login`, logout: `${auth.base}/logout`,
        register: `${auth.base}/register`, user: `${auth.base}/user`};

    return auth;
}());

export const getMakeSureIsOk = function ({invalidStatusMessage, allowedStatuses}) {
    return function (res) {
        if (!allowedStatuses.includes(res.status)) {
            return {message: invalidStatusMessage};
        }

        return res;
    };
};

export const getMakeSureIsOkWithStream = function ({streamType = "json", allowedStatuses}) {
    return function (res) {
        if (!allowedStatuses.includes(res.status)) {
            return res[streamType]().then(({message})=>{
                throw {message};
            });
        }

        return res[streamType]();
    };
};

export const defaultOptions = {
    mode: "cors",
    credentials: "include",
};