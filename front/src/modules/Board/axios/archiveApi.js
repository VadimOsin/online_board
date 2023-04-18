import {$authHost} from "../../../global/indexHost";

export const createAdsToArchive = async (id) => {
    try {
        const {data} = await $authHost.post(`api/archive/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при добавлении записи!');
    }
};

export const deleteAdsToArchive = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/archive/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при удалении записи!');
    }
};

export const getAllAdsToArchive = async (id) => {
    try {
        const {data} = await $authHost.get(`api/archive/${id}`)

        return data
    } catch (error) {
        throw new Error('Ошибка при получении записи!');
    }
};