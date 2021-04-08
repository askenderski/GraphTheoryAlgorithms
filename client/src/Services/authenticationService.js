import {baseUrl} from "./common";

export const register = function ({email, username, password}) {
    return fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, username, password})
    })
        .then(res=>{
            if (res.status !== 201) {
                return res.json().then(({message})=>{
                    throw {message};
                });
            }

            return res.json();
        });
};

export const login = function ({email, password}) {
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({email, password})
    })
        .then(res=>{
            if (res.status !== 200) {
                return res.json().then(({message})=>{
                    throw {message};
                });
            }

            return res.json();
        });
};