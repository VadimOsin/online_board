import {$authHost} from "../../../global/indexHost";

export const createAds = async (ads) => {
    try {
        const {data} = await $authHost.post('api/ads/', ads)
        return data
    } catch (error) {
        throw new Error('Ошибка при создании записи!');
    }
};

export const deleteAds = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/ads/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при удалении записи!');
    }
};

export const updateAds = async (id, title, text, date_created, date_end, date_updated, likes, dislike, id_person, img) => {
    try {
        const {data} = await $authHost.put(`api/ads/${id}`, {
            title,
            text,
            date_created,
            date_end,
            date_updated,
            likes,
            dislike,
            id_person,
            img
        })
        return data
    } catch (error) {
        throw new Error('Ошибка при обновлении записи!');
    }
};

export const getOneByIdAds = async (id) => {
    try {
        const {data} = await $authHost.get(`api/ads/${id}`)

        return data
    } catch (error) {
        throw new Error('Ошибка при получении записи!');
    }
};