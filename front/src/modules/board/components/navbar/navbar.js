import React, {useContext} from 'react';
import {UserContext} from '../../../auth/context/userContext';
import {
    BOARD_ROUTE,
    COMMENTS_USER_ROUTE,
    EDIT_PROFILE_ROUTE,
    LOGIN_ROUTE,
    NOTES_ADS_ROUTE
} from '../../../auth/utils/const';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar = () => {
    const user = useContext(UserContext);
    const {logOut} = useContext(UserContext);


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    <Button component={Link} to={BOARD_ROUTE} color="inherit"> Online Board</Button>
                </Typography>

                <div className="user-options">
                    {user.isAuth ? (
                        <>
                            <div className="navbar__user__details">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Button component={Link} to={EDIT_PROFILE_ROUTE}
                                                color="inherit">{user.login}</Button>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Button component={Link} to={NOTES_ADS_ROUTE}
                                                color="inherit">Сохраненые объявления</Button>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Button component={Link} to={COMMENTS_USER_ROUTE}
                                                color="inherit">Комментарии пользователя</Button>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            <Button component={Link} to={BOARD_ROUTE} onClick={logOut} color="inherit">
                                Выйти!
                            </Button>
                        </>
                    ) : (
                        <Button component={Link} to={LOGIN_ROUTE} color="inherit">
                            Войдите!
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
