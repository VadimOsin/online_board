import jwt_decode from 'jwt-decode';
import {$authHost, $host} from "../../../global/indexHost";

export const registration = async (login,password,email,telephone,name,surname) => {
    try {
        const {data} = await $host.post('api/user/registration', {login,password,email,telephone,name,surname});
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token)
    } catch (error) {
        throw new Error('Ошибка при регистрации пользователя!');
    }
};

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
        .catch(
            error => {
                throw new Error(error.response.data.message);
            }
        );
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
};


export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        throw new Error('Автаризуйтесь снова!');
    }
};