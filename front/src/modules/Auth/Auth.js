import React, {useState} from 'react';
import {UserContext} from "./context/userContext";
import {authRoutes, publicRoutes} from "./routes/routes";
import {Routes, Route} from 'react-router-dom';
const Auth = () => {
    const [user, setUser] = useState({
        id: '',
        login: '',
        password: '',
        role: '',
        isAuth: false
    });

    const signIn = (id, login , password,role) => {
        setUser({
            id: id,
            login: login,
            password: password,
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