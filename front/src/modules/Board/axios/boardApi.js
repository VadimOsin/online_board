import {$authHost} from "../../../global/indexHost";

export const createAdsToBoard = async (id) => {
    try {
        const {data} = await $authHost.post(`api/board/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при добавлении записи!');
    }
};

export const deleteAdsToBoard = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/board/${id}`)
        return data
    } catch (error) {
        throw new Error('Ошибка при удалении записи!');
    }
};

export const getAllAdsToBoard = async () => {
    try {
        const {data} = await $authHost.get(`api/board/`)

        return data
    } catch (error) {
        throw new Error('Ошибка при получении записи!');
    }
};