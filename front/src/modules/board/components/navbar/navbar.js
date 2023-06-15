import React, {useContext} from 'react';
import {UserContext} from '../../../auth/context/userContext';
import {BOARD_ROUTE, EDIT_PROFILE_ROUTE, LOGIN_ROUTE} from '../../../auth/utils/const';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';

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
                            <Button component={Link} to={EDIT_PROFILE_ROUTE} color="inherit">{user.login}</Button>
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
