import {ADMIN_ROUTE, ADS_ROUTE, BOARD_ROUTE, EDIT_PROFILE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/const";
import Login from "../component/login/login";
import Board from "../../board/Board";
import AdsById from "../../adsById/AdsById";
import EditProfile from "../../editProfile/editProfile";

export const authRoutes = [
    {
        path: EDIT_PROFILE_ROUTE,
        Component: EditProfile
    },
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