import React, {useState, useEffect} from "react";
import "./App.css";
import {Routes} from "./Data/Routes/routes";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import {BrowserRouter} from "react-router-dom";
import UserContext from "./Contexts/User";
import {getUser} from "./Services/authenticationService";
import store from './Store/store';
import { Provider } from 'react-redux';

function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        getUser()
            .then(({user})=>{
                setUser(user);
            })
            .catch(err=>{});
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserContext.Provider value={{user, setUser}}>
                    <Header/>
                    <Content routes={Routes}/>
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;