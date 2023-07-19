// export const baseUrl = "https://graph-theory-algorithms.herokuapp.com";
export const baseUrl = "http://localhost:5000";

export const articles = {
    base: `${baseUrl}/articles`
};

export const graphs = {
    base: `${baseUrl}/graphs`
};

export const auth = (function(){
    const authBase = `${baseUrl}/auth`;

    const auth = {base: authBase, login: `${authBase}/login`, logout: `${authBase}/logout`,
        register: `${authBase}/register`, user: `${authBase}/user`};

    return auth;
}());

export const getMakeSureIsOk = function (
    {invalidStatusMessage, allowedStatuses}: {invalidStatusMessage: string, allowedStatuses: any[]}
) {
    return function (res: Response) {
        if (!allowedStatuses.includes(res.status)) {
            return {message: invalidStatusMessage};
        }

        return res;
    };
};

export const getMakeSureIsOkWithStream = function (
    {streamType = "json", allowedStatuses}: {streamType?: "json" | "text", allowedStatuses: any[]}
) {
    return function (res: Response) {
        if (!allowedStatuses.includes(res.status)) {
            return (res[streamType]() as Promise<{message: string}>).then(({message})=>{
                throw Error(message);
            });
        }

        return res[streamType]();
    };
};

export const defaultOptions: RequestInit = {
    mode: "cors",
    credentials: "include"
};