import React, {useEffect, useState} from 'react';
import {
    Typography,
    Container,
    Card,
    CardContent,
    CardMedia,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {getOneByIdAds} from "../board/axios/adsApi";
import {useParams} from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const AdsById = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const {id} = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        getOneByIdAds(id)
            .then(res => setNews(res))
            .catch(e => console.log(e.data.message));
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            const currentDate = new Date().toLocaleString();
            setComments((prevComments) => [
                ...prevComments,
                {
                    text: newComment,
                    author: 'Имя Фамилия', // Замените на соответствующее имя и фамилию
                    time: currentDate,
                },
            ]);
            setNewComment('');
        }
    };

    const handleLike = () => {
        // Обработчик для лайков
    };

    const handleDislike = () => {
        // Обработчик для дизлайков
    };

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            {news ? (
                <Box>
                    <Container maxWidth="md" sx={{marginTop: 4}}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={process.env.REACT_APP_API_URL + news.url}
                                alt={news.title}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {news.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {news.text}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <Button startIcon={<ThumbUpIcon/>} onClick={handleLike}>
                                        {news.likes}
                                    </Button>
                                    <Button startIcon={<ThumbDownIcon/>} onClick={handleDislike}>
                                        {news.dislike}
                                    </Button>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Дата окончания: {formatDate(news.date_end)}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Box sx={{marginTop: 4}}>
                            <Typography variant="h6" gutterBottom>
                                Комментарии
                            </Typography>
                            <List>
                                {comments.map((comment, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`${comment.author} - ${comment.time}`}
                                                secondary={comment.text}
                                            />
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                ))}
                            </List>
                            <Box sx={{marginTop: 2}}>
                                <TextField
                                    label="Оставить комментарий"
                                    variant="outlined"
                                    fullWidth
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCommentSubmit}
                                    sx={{marginTop: 2}}
                                >
                                    Отправить
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            ) : null}
        </>
    );
};

export default AdsById;
