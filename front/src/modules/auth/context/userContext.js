import  { createContext } from 'react';

export const UserContext = createContext({
    id:'',

    login: '',

    password:'',

    role:'',

    isAuth: false
});