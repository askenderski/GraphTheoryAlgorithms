// export const baseUrl = "https://graph-theory-algorithms.herokuapp.com";
export const baseUrl = "http://localhost:5000";

export const articles = {
    base: `${baseUrl}/articles`
};

export const auth = (function(){
    let auth = {base: `${baseUrl}/auth`};

    auth = {...auth, login: `${auth.base}/login`, register: `${auth.base}/register`};

    return auth;
}());

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