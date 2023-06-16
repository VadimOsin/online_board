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
        const {data} = await $authHost.get(`api/comments/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при получении комментариев!');
    }
};

export const createComments = async (title,
                                     text,
                                     date_created,
                                     id_person,
                                     id_ads) => {

    try {
        const {data} = await $authHost.post(`api/comments/`, {
            title,
            text,
            date_created,
            id_person,
            id_ads
        })
        return data
    } catch (error) {
        throw new Error('Ошибка при создании комментария!');
    }
};