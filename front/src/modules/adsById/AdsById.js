import React, { useContext, useEffect, useState } from 'react';
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
    Paper,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { getOneByIdAds } from '../board/axios/adsApi';
import { getAllComments, addComment } from './axios/comments';
import { getUserInfo } from './axios/user';
import { UserContext } from '../auth/context/userContext';
import {useParams} from "react-router-dom";

const AdsById = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const user = useContext(UserContext);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        getOneByIdAds(id)
            .then((res) => setNews(res))
            .catch((e) => console.log(e.data.message));
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getAllComments(id);
                const commentsWithUsers = await Promise.all(
                    commentsData.map(async (comment) => {
                        const user = await getUserInfo(comment.id_person);
                        return { ...comment, user };
                    })
                );
                setComments(commentsWithUsers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() !== '') {
            const currentDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const newCommentData = {
                text: newComment,
                user: {
                    login: user.login,
                },
                date_created: currentDate,
            };
            try {
                // await addComment(id, newCommentData);
                setComments((prevComments) => [...prevComments, newCommentData]);
                setNewComment('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleLike = () => {
        if (!liked && !disliked) {
            setLiked(true);
            setNews((prevNews) => ({
                ...prevNews,
                likes: prevNews.likes + 1,
            }));
        } else if (liked && !disliked) {
            setLiked(false);
            setNews((prevNews) => ({
                ...prevNews,
                likes: prevNews.likes - 1,
            }));
        }
    };

    const handleDislike = () => {
        if (!liked && !disliked) {
            setDisliked(true);
            setNews((prevNews) => ({
                ...prevNews,
                dislikes: prevNews.dislikes + 1,
            }));
        } else if (!liked && disliked) {
            setDisliked(false);
            setNews((prevNews) => ({
                ...prevNews,
                dislikes: prevNews.dislikes - 1,
            }));
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            {news ? (
                <Box>
                    <Container maxWidth="md" sx={{ marginTop: 4 }}>
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
                                    <Button startIcon={<ThumbUpIcon />} onClick={handleLike} disabled={liked}>
                                        {news.likes}
                                    </Button>
                                    <Button startIcon={<ThumbDownIcon />} onClick={handleDislike} disabled={disliked}>
                                        {news.dislikes}
                                    </Button>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Дата окончания: {formatDate(news.date_end)}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Комментарии
                            </Typography>
                            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', border: '1px solid #ccc' }}>
                                <List>
                                    {comments.map((comment, index) => (
                                        <React.Fragment key={comment?.id_comments}>
                                            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', border: '1px solid #ccc' }}>
                                                <ListItem>
                                                    <ListItemText secondary={comment.text} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary={`${comment?.user?.login}`} secondary={formatDate(comment.date_created)} />
                                                </ListItem>
                                            </Paper>
                                            {index !== comments.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                            <Box sx={{ marginTop: 2 }}>
                                <TextField
                                    label="Оставить комментарий"
                                    variant="outlined"
                                    fullWidth
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                                <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ marginTop: 2 }}>
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
