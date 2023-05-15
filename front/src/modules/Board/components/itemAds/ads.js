import React, {useContext} from 'react';
import './ads.css'
import {UserContext} from "../../../Auth/context/userContext";
const Ads = ({ads,onDelete}) => {
    const user = useContext(UserContext)
    const date = new Date(ads.date_end.slice(0, -5));
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let colorTime;
    if (diffDays <= 2) {
        colorTime = "danger"
    } else if (diffDays > 2 && diffDays <= 5) {
        colorTime = "warning"
    } else if (diffDays > 5 && diffDays <= 10) {
        colorTime = "good"
    } else {
        colorTime = ""
    }

    return (
        <li className="project-item">
            <div className="logo-row"><img src={process.env.REACT_APP_API_URL + ads.url} width={60} height={60}
                                           alt="img"/>
                {user.role === "ADMIN" ? <div className="btn_delete" onClick={(e)=>onDelete(ads.id_ads)}>delete</div> : ""}
                <div className="icon"><i className="fa fa-ellipsis-h icon"
                                         aria-hidden="true"></i></div>
            </div>
            <div className="title-row">
                <h3>{ads.title}</h3>

            </div>
            <div className="desc-row">
                <p> {ads.text}</p>
            </div>

            <div className="footer-row">
                <div className={`days ${colorTime}`}><i className="fa fa-clock-o icon"
                                                        aria-hidden="true"></i> {diffDays}{diffDays > 1 ? "days left" : "day left"}
                </div>
            </div>
        </li>
    );
};

export default Ads;