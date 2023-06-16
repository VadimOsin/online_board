import {$authHost} from "../../../global/indexHost";



export const getUserInfo = async (id) => {
    try {
        const {data} = await $authHost.get(`api/user/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при получении комментариев!');
    }
};