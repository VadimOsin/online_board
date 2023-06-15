import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';

const NotesAds = () => {
    const [savedNews, setSavedNews] = useState([]);

    useEffect(() => {
        // Здесь вы можете добавить логику для получения сохраненных новостей пользователя из сервера или хранилища данных
        // В данном примере используется временный массив с сохраненными новостями
        const fetchSavedNews = async () => {
            // Вместо этого блока кода, добавьте логику для получения сохраненных новостей пользователя
            const userSavedNews = [
                {
                    id: 1,
                    title: 'Новость 1',
                    text: 'Текст новости 1',
                    image: 'https://phonoteka.org/uploads/posts/2021-05/1620315781_36-phonoteka_org-p-fon-novostei-pervogo-kanala-37.png',
                },
                {
                    id: 2,
                    title: 'Новость 2',
                    text: 'Текст новости 2',
                    image: 'https://phonoteka.org/uploads/posts/2021-05/1620315781_36-phonoteka_org-p-fon-novostei-pervogo-kanala-37.png',
                },
                {
                    id: 3,
                    title: 'Новость 3',
                    text: 'Текст новости 3',
                    image: 'https://phonoteka.org/uploads/posts/2021-05/1620315781_36-phonoteka_org-p-fon-novostei-pervogo-kanala-37.png',
                },
            ];
            setSavedNews(userSavedNews);
        };

        fetchSavedNews();
    }, []);

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
                <Typography variant="h5" gutterBottom>
                    Сохраненные новости
                </Typography>
                <List>
                    {savedNews.map((news) => (
                        <React.Fragment key={news.id}>
                            <Card sx={{ display: 'flex', marginBottom: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 140 }}
                                    image={news.image}
                                    alt={news.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {news.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {news.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Container>
        </Box>
    );
};

export default NotesAds;
