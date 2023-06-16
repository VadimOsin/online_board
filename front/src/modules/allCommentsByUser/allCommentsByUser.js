import React, {useState, useEffect, useContext} from 'react';
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
    Divider, Paper,
} from '@mui/material';
import {UserContext} from "../auth/context/userContext";
import {getAllCommentsByUserId} from "./axios/comment";

const AllCommentsByUser = () => {
    const [comments, setComments] = useState([]);
    const user = useContext(UserContext)

    useEffect(() => {
        getAllCommentsByUserId(user.id).then(res => setComments(res)).catch(e => console.log(e.data.message))
    }, []);

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <Box>

            <Container maxWidth="md" sx={{marginTop: 4}}>
                <Typography variant="h5" gutterBottom>
                    Ваши комментарии
                </Typography>
                {comments.length !== 0 ?
                    <Paper elevation={3}
                           style={{padding: '16px', marginTop: '16px', border: '1px solid #ccc'}}>
                        <List>
                            {comments.map((comment, index) => (
                                <React.Fragment key={index}>
                                    <Paper elevation={3} style={{
                                        padding: '16px',
                                        marginTop: '16px',
                                        border: '1px solid #ccc'
                                    }}>
                                        <ListItem>
                                            <ListItemText secondary={comment.text}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                secondary={formatDate(comment.date_created)}/>
                                        </ListItem>
                                    </Paper>
                                    {index !== comments.length - 1 && <Divider/>}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper> : null}
            </Container>
        </Box>
    );
};

export default AllCommentsByUser;
