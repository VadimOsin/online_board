import {
    ADMIN_ROUTE,
    ADS_ROUTE,
    BOARD_ROUTE, COMMENTS_USER_ROUTE,
    EDIT_PROFILE_ROUTE,
    LOGIN_ROUTE,
    NOTES_ADS_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/const";
import Login from "../component/login/login";
import Board from "../../board/Board";
import AdsById from "../../adsById/AdsById";
import EditProfile from "../../editProfile/editProfile";
import NotesAds from "../../notesAds/notesAds";
import allCommentsByUser from "../../allCommentsByUser/allCommentsByUser";

export const authRoutes = [
    {
        path: EDIT_PROFILE_ROUTE,
        Component: EditProfile
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: NOTES_ADS_ROUTE,
        Component: NotesAds
    },
    {
        path: COMMENTS_USER_ROUTE,
        Component: allCommentsByUser
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