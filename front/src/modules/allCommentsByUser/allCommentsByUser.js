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

        const fetchUserComments = async () => {

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
