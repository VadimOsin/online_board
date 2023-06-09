import {ADMIN_ROUTE, ADS_ROUTE, BOARD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/const";
import Login from "../component/login/login";
import Board from "../../Board/Board";
import AdsById from "../../AdsById/AdsById";

export const authRoutes = [
    // {
    //     path: ADMIN_ROUTE+ '/:id',
    //     Component: AddOrEditFilm
    // }
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const publicRoutes = [
    {
        path: BOARD_ROUTE,
        Component: Board
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Login
     },
    {
        path: ADS_ROUTE+ '/:id',
        Component: AdsById
    }
]