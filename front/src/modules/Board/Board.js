import React, {useContext, useEffect, useState} from 'react';
import './Board.css'
import Navbar from "./components/navbar/navbar";
import {createAdsToBoard, deleteAdsToBoard, getAllAdsToBoard} from "./axios/boardApi";
import Ads from "./components/itemAds/ads";
import Modal from "./components/modal/modal";
import {UserContext} from "../Auth/context/userContext";
import {createAds, deleteAds, getOneByIdAds} from "./axios/adsApi";
import {createAdsToArchive, getAllAdsToArchive} from "./axios/archiveApi";

const Board = () => {
    const user = useContext(UserContext)
    const [listAds, setListAds] = useState([])
    const [listArchiveAds, setArchiveListAds] = useState([])
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        getAllAdsToBoard().then(res => {
                res.map(i =>
                    getOneByIdAds(i.id_ads).then(response => setListAds([...listAds, response])).catch(error => console.log(error.message))
                )
            }
        ).catch(error => console.log(error.message))

        getAllAdsToArchive().then(res => {
                res.map(i =>
                    getOneByIdAds(i.id_ads).then(response => setArchiveListAds([...listArchiveAds, response])).catch(error => console.log(error.message))
                )
            }
        ).catch(error => console.log(error.message))
    }, [])

    useEffect(() => {
        setQuery("")
    }, [activeIndex])
    const newAds = async (value, file) => {
        const ads = new FormData()
        ads.append("title", value.title)
        ads.append("text", value.text)
        ads.append("likes", value.likes)
        ads.append("dislike", value.dislike)
        ads.append("id_person", user.id)
        ads.append("img", file)
        ads.append("date_created", formatDate(""))
        ads.append("date_end", formatDate(value.date_end))
        ads.append("date_updates", formatDate(""))

        await createAds(ads).then(res => {
                setListAds([...listAds, res])
                createAdsToBoard(res.id_ads).catch(error => console.log(error))
            }
        ).catch(error => console.log(error))
    }
    const formatDate = (date = "") => {
        if (date !== "") {
            const currentDate = new Date();
        } else {
            const currentDate = new Date(date);
        }
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const year = currentDate.getFullYear().toString();
        return `${day}-${month}-${year}`;

    }
    const onDeleteBoard = async (value) => {
        listAds.map(i => {
            if (i.id_ads === value) {
                setArchiveListAds([...listArchiveAds, i])
            }
        })
        setListAds(listAds.filter(i => i.id_ads !== value))
        await deleteAdsToBoard(value).catch(error => console.log(error))
        await createAdsToArchive(value).catch(error => console.log(error))
    }
    const onDeleteToArchiveAds = async (value) => {
        await deleteAds(value).catch(error => console.log(error))
        setArchiveListAds(listArchiveAds.filter(i => i.id_ads !== value))
    }
    return (
        <div>
            <div className="container">
                <div className="content">

                    <section className="main-content">
                        <div className="app">
                            <Navbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} active={listAds?.length}
                                    archive={listArchiveAds?.length}/>
                            <section className="app-content">
                                <header>
                                    <div className="searchbox">
                                        <div className="icon"><i className="fa fa-search" aria-hidden="true"></i></div>
                                        <input type="text" name="search" placeholder="Search a project"
                                               className="search-text"
                                               value={query}
                                               onChange={event => setQuery(event.target.value)}/>
                                    </div>

                                    <div className="app-list-options">
                                        <div className="display-group">
                                            <div className="icon"><i className="fa fa-bars" aria-hidden="true"></i>
                                            </div>
                                            <div className="icon selected"><i className="fa fa-th"
                                                                              aria-hidden="true"></i></div>
                                        </div>
                                    </div>

                                </header>

                                <ul className="projects">
                                    {(activeIndex === 1 || activeIndex === 0) && listAds && listAds.filter(item => {
                                        if (query === '') {
                                            return item;
                                        } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
                                            return item;
                                        }
                                    }).map((i, index) =>
                                        <Ads key={i.id_ads} ads={listAds[index]} onDelete={onDeleteBoard}/>
                                    )}

                                    {(activeIndex === 2 || activeIndex === 0) && listArchiveAds && listArchiveAds.filter(item => {
                                        if (query === '') {
                                            return item;
                                        } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
                                            return item;
                                        }
                                    }).map((i, index) =>
                                        <Ads key={i.id_ads} ads={listArchiveAds[index]}
                                             onDelete={onDeleteToArchiveAds}/>
                                    )}
                                </ul>
                            </section>
                            <Modal open={open} setOpen={setOpen} title={"Add new ads"} initialValue={""}
                                   onSave={newAds}/>
                            {user.role === "ADMIN" ?
                                <div className="fab-icon" onClick={() => setOpen(true)}>+</div> : ""}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Board;