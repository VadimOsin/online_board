import React, {useContext} from 'react';
import './navbar.css'
import {UserContext} from "../../../Auth/context/userContext";
import {BOARD_ROUTE, LOGIN_ROUTE} from "../../../Auth/utils/const";
import {Link} from "react-router-dom";

const Navbar = () => {
    const user = useContext(UserContext)
    return (
        <header className="sub-menu">
            <div className="title">Online Board</div>
            <ul className="menu">
                <li> All
                    <div className="badge"> 87 </div>
                </li>
                <li className="selected"> Current
                    <div className="badge"> 6 </div>
                </li>
                <li> Pending
                    <div className="badge"> 2 </div>
                </li>
            </ul>

            <div className="user-options">
                {user.isAuth ? <>
                    <div className="user-info">{user.login}< /div>
                    <Link to={BOARD_ROUTE}>Выйти!</Link></> : <Link to={LOGIN_ROUTE}>Войдите!</Link>}
            </div>
        </header>
    );
};

export default Navbar;