import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
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

const AdsById = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const news = {
        id: 1,
        title: 'Заголовок новости',
        text: 'Текст новости',
        image: 'https://phonoteka.org/uploads/posts/2021-05/1620315781_36-phonoteka_org-p-fon-novostei-pervogo-kanala-37.png',
    };

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

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Пользовательский заголовок
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={news.image}
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
                </Card>
                <Box sx={{ marginTop: 4 }}>
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
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                    <Box sx={{ marginTop: 2 }}>
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
                            sx={{ marginTop: 2 }}
                        >
                            Отправить
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AdsById;
