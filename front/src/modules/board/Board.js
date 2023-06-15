import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Container,
    TextField,
    Tabs,
    Tab,
    List
    , Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {createAdsToBoard, deleteAdsToBoard, getAllAdsToBoard} from "./axios/boardApi";
import Ads from "./components/itemAds/ads";
import {UserContext} from "../auth/context/userContext";
import {createAds, deleteAds, getOneByIdAds, updateAds} from "./axios/adsApi";
import {createAdsToArchive, deleteAdsToArchive, getAllAdsToArchive} from "./axios/archiveApi";
import {Add} from "@mui/icons-material";
import CustomModal from "./components/modal/modal";
import './Board.css'

const Board = () => {
    const user = useContext(UserContext);
    const [listAds, setListAds] = useState([]);
    const [listArchiveAds, setArchiveListAds] = useState([]);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const boardAds = await getAllAdsToBoard();
                const boardAdsById = await Promise.all(boardAds.map(i => getOneByIdAds(i.id_ads)));
                setListAds(boardAdsById);

                const archiveAds = await getAllAdsToArchive();
                const archiveAdsById = await Promise.all(archiveAds.map(i => getOneByIdAds(i.id_ads)));
                setArchiveListAds(archiveAdsById);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setQuery("");
    }, [activeIndex]);

    const newAds = async (value, file) => {
        const ads = new FormData();
        ads.append("title", value.title);
        ads.append("text", value.text);
        ads.append("likes", value.likes);
        ads.append("dislike", value.dislike);
        ads.append("id_person", user.id);
        ads.append("img", file);
        ads.append("date_created", formatDate(""));
        ads.append("date_end", value.date_end);
        ads.append("date_updated", formatDate(""));
        await createAds(ads)
            .then(res => {
                setListAds([...listAds, res]);
                createAdsToBoard(res.id_ads).catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    const formatDate = (date = "") => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const year = currentDate.getFullYear().toString();
        return `${day}-${month}-${year}`;
    };

    const onDeleteBoard = async value => {
        listAds.map(i => {
            if (i.id_ads === value) {
                setArchiveListAds([...listArchiveAds, i]);
            }
        });
        setListAds(listAds.filter(i => i.id_ads !== value));
        await deleteAdsToBoard(value).catch(error => console.log(error));
        await createAdsToArchive(value).catch(error => console.log(error));
        console.log(value);
    };

    const onDeleteToArchiveAds = async value => {
        await deleteAdsToArchive(value).catch(error => console.log(error));
        await deleteAds(value).catch(error => console.log(error));
        setArchiveListAds(listArchiveAds.filter(i => i.id_ads !== value));
    };

    const onEditAds = async value => {
        // setOpen(true)
        // await updateAds(value, id, title, text, date_created, date_end, date_updated, likes, dislike, id_person, img).catch(error => console.log(error))
    };
    return (
        <div>

            <Box>
                <Container maxWidth="md" sx={{marginTop: 4}}>
                    <TextField
                        label="Фильтр"
                        variant="outlined"
                        fullWidth
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        sx={{marginBottom: 2}}
                    />
                    <Box sx={{marginBottom: 2}}>
                        <Tabs
                            value={activeIndex}
                            onChange={(_, newIndex) => setActiveIndex(newIndex)}
                            textColor="primary"
                            indicatorColor="primary"
                        >

                            <Tab label={`Все (${listArchiveAds?.length + listAds?.length})`}/>
                            <Tab label={`Активные (${listAds?.length})`}/>
                            <Tab label={`Архивные (${listArchiveAds?.length})`}/>
                        </Tabs>
                    </Box>
                    <List className="projects">
                        {(activeIndex === 1 || activeIndex === 0) &&
                            listAds &&
                            listAds
                                .filter(item => {
                                    if (query === "") {
                                        return item;
                                    } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
                                        return item;
                                    }
                                })
                                .map(i => (
                                    <Ads key={i.id_ads} ads={i} onDelete={onDeleteBoard} onEditAds={onEditAds}/>
                                ))}
                        {(activeIndex === 2 || activeIndex === 0) &&
                            listArchiveAds &&
                            listArchiveAds
                                .filter(item => {
                                    if (query === "") {
                                        return item;
                                    } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
                                        return item;
                                    }
                                })
                                .map(i => (
                                    <Ads key={i.id_ads} ads={i} onDelete={onDeleteToArchiveAds} onEditAds={onEditAds}/>
                                ))}
                    </List>
                    {user.role === 'ADMIN' && (
                        <Fab onClick={() => setOpen(true)} size="medium" color="primary" aria-label="add">
                            <AddIcon/>
                        </Fab>
                    )}
                </Container>
            </Box>
            <CustomModal
                open={open}
                setOpen={setOpen}
                title="Add new ads"
                initialValue={{
                    title: "",
                    text: "",
                    date_end: "",
                    likes: 0,
                    dislike: 0,
                }}
                onSave={newAds}
            />
        </div>
    )
        ;
};

export default Board;
