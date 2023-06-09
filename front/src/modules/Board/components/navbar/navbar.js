import React, { useContext } from 'react';
import { UserContext } from '../../../Auth/context/userContext';
import { BOARD_ROUTE, LOGIN_ROUTE } from '../../../Auth/utils/const';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    const user = useContext(UserContext);
    const { logOut } = useContext(UserContext);


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Online Board
                </Typography>

                <div className="user-options">
                    {user.isAuth ? (
                        <>
                            <div className="user-info">{user.login}</div>
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
