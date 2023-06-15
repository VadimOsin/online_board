import {$authHost} from "../../../global/indexHost";

export const deleteComment = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/comments/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при удалении коментария!');
    }
};

export const getAllComments = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/comments/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при получении комментариев!');
    }
};