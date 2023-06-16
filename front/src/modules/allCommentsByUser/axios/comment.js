import {$authHost} from "../../../global/indexHost";

export const getAllCommentsByUserId = async (id) => {
    try {
        const {data} = await $authHost.get(`api/comments/user/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при получении комментариев!');
    }
};