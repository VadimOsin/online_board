import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';

const AllCommentsByUser = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Здесь вы можете добавить логику для получения комментариев пользователя из сервера или хранилища данных
        // В данном примере используется временный массив с комментариями
        const fetchUserComments = async () => {
            // Вместо этого блока кода, добавьте логику для получения комментариев пользователя
            const userComments = [
                {
                    id: 1,
                    text: 'Комментарий 1',
                    date: '2023-06-01',
                },
                {
                    id: 2,
                    text: 'Комментарий 2',
                    date: '2023-06-02',
                },
                {
                    id: 3,
                    text: 'Комментарий 3',
                    date: '2023-06-03',
                },
            ];
            setComments(userComments);
        };

        fetchUserComments();
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
                    Ваши комментарии
                </Typography>
                <List>
                    {comments.map((comment) => (
                        <React.Fragment key={comment.id}>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="body1" gutterBottom>
                                        {comment.text}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Дата: {comment.date}
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

export default AllCommentsByUser;
