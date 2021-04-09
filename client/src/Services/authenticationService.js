import {auth, getMakeSureIsOkWithStream} from "./common";

export const register = function ({email, username, password}) {
    return fetch(auth.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, username, password})
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [201]}));
};

export const login = function ({email, password}) {
    return fetch(auth.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({email, password})
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}));
};