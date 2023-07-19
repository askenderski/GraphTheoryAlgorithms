import {auth, getMakeSureIsOkWithStream, defaultOptions, getMakeSureIsOk} from "./common";

export const register = function ({email, username, password}: {email: string, username: string, password: string}) {
    return fetch(auth.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, username, password})
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [201]}));
};

export const login = function ({email, password}: {email: string, password: string}) {
    return fetch(auth.login, {
        ...defaultOptions,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}));
};

export const getUser = function () {
    return fetch(auth.user, {
        ...defaultOptions,
        method: 'GET'
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}));
};

export const logout = function () {
    return fetch(auth.logout, {
        ...defaultOptions,
        method: 'POST'
    })
        .then(getMakeSureIsOk({allowedStatuses: [205], invalidStatusMessage: "Couldn't log out"}));
};