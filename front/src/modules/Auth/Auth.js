import React, {useEffect, useState} from 'react';
import {UserContext} from "./context/userContext";
import {authRoutes, publicRoutes} from "./routes/routes";
import {Routes, Route} from 'react-router-dom';
import {check} from "./axios/userApi";

const Auth = () => {
    const [user, setUser] = useState({
        id: '',
        login: '',
        password: '',
        role: '',
        isAuth: false
    });

    const signIn = (id, login, role) => {
        setUser({
            id: id,
            login: login,
            role: role,
            isAuth: true
        });
    };

    const logOut = () => {
        setUser({
            id: '',
            login: '',
            password: '',
            role: '',
            isAuth: false
        });
    };

    useEffect(() => {
        check().then((response) => {
            signIn(response.id, response.login, response.role)
        })

    }, [])

    return (
        <UserContext.Provider value={{...user, signIn, logOut}}>
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route path="*" element={<div>NotFound</div>}/>
            </Routes>
        </UserContext.Provider>
    );
};

export default Auth;