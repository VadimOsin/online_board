import React, {useContext, useState} from 'react';
import './navbar.css'
import {UserContext} from "../../../Auth/context/userContext";
import {BOARD_ROUTE, LOGIN_ROUTE} from "../../../Auth/utils/const";
import {Link} from "react-router-dom";

const Navbar = ({activeIndex,setActiveIndex,active=0,archive=0}) => {
    const user = useContext(UserContext)


    const handleItemClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <header className="sub-menu">
            <div className="title">Online Board</div>
            <ul className="menu">
                <li className={activeIndex === 0 ? "selected" : ""} onClick={() => handleItemClick(0)}>
                    All
                    <div className="badge"> {active+archive} </div>
                </li>
                <li className={activeIndex === 1 ? "selected" : ""} onClick={() => handleItemClick(1)}>
                    Active
                    <div className="badge"> {active} </div>
                </li>
                <li className={activeIndex === 2 ? "selected" : ""} onClick={() => handleItemClick(2)}>
                    Archive
                    <div className="badge"> {archive} </div>
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