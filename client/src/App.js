import React, {useState, useEffect} from "react";
import "./App.css";
import {Routes} from "./Data/Routes/routes";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import {BrowserRouter} from "react-router-dom";
import UserContext from "./Contexts/User";
import {getUser} from "./Services/authenticationService";

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
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <Header/>
                <Content routes={Routes}/>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;