import React, {useContext} from 'react';

import {UserContext} from '../../../Auth/context/userContext';
import {Card, CardMedia, CardContent, Typography, IconButton, Box, ListItem} from '@mui/material';
import {Delete, MoreHoriz, Alarm} from '@mui/icons-material';

const Ads = ({ads, onDelete}) => {
    const user = useContext(UserContext);
    const date = new Date(ads.date_end.slice(0, -5));
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let colorTime;
    if (diffDays <= 2) {
        colorTime = 'danger';
    } else if (diffDays > 2 && diffDays <= 5) {
        colorTime = 'warning';
    } else if (diffDays > 5 && diffDays <= 10) {
        colorTime = 'good';
    } else {
        colorTime = '';
    }

    return (
        <ListItem sx={{marginBottom: 2, maxWidth: 250, maxHeight: 300}}>
            <Card sx={{width: 250, height: 300}}>
                <CardMedia component="img" height="140" image={process.env.REACT_APP_API_URL + ads.url} alt="img"/>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {ads.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{maxHeight: 50}} overflow="scroll">
                        {ads.text}
                    </Typography>
                </CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                    <div className={`days ${colorTime}`}>
                        <Alarm/>
                        {diffDays}
                        {diffDays > 1 ? ' days left' : ' day left'}
                    </div>
                    <div>
                        {user.role === 'ADMIN' && (
                            <IconButton onClick={(e) => onDelete(ads.id_ads)}>
                                <Delete/>
                            </IconButton>
                        )}
                        <IconButton>
                            <MoreHoriz/>
                        </IconButton>
                    </div>
                </Box>
            </Card>
        </ListItem>
    );
};

export default Ads;
