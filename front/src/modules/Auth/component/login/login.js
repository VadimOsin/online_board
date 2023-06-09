import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/const';
import { login, registration } from '../../axios/userApi';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { signIn } = useContext(UserContext);
    const [reg, setReg] = useState({
        login: '',
        password: '',
        email: '',
        tel: '',
        name: '',
        surname: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const onChange = ({ target: { name, value } }) => {
        setReg({ ...reg, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const isEmailValid = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let newErrors = {};

        if (!reg.email || !isEmailValid(reg.email)) {
            newErrors.email = 'Введите корректный email';
        }
        if (
            !reg.password ||
            reg.password.length < 8 ||
            reg.password.length > 12
        ) {
            newErrors.password = 'Введите пароль от 8 до 12 символов';
        }
        if (reg.password !== reg.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        if (!reg.name || reg.name.length < 2) {
            newErrors.name = 'Введите имя (минимум 2 символа)';
        }
        if (!reg.surname || reg.surname.length < 2) {
            newErrors.surname = 'Введите фамилию (минимум 2 символа)';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const authClick = async () => {
        if (!isLogin) {
            if (!validateForm()) {
                return;
            }

            const data = await registration(reg.login,reg.password,reg.email,reg.tel,reg.name,reg.surname).catch((error) => {
                setErrors({ ...errors, server: error.message });
            });

            if (data) {
                signIn(data.id, data.login, data.role);
                navigate('/');
            }
        } else {
            const data = await login(reg.login, reg.password).catch((error) => {
                setErrors({ ...errors, server: error.message });
            });

            if (data) {
                signIn(data.id, data.login, data.role);
                navigate('/');
            }
        }
    };

    return (
        <Container
            maxWidth="xs"
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            name="login"
                            value={reg.login}
                            onChange={onChange}
                            label="Login"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name="password"
                            value={reg.password}
                            onChange={onChange}
                            label="Password"
                            fullWidth
                            required
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                    </Grid>
                    {!isLogin && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    type="password"
                                    name="confirmPassword"
                                    value={reg.confirmPassword}
                                    onChange={onChange}
                                    label="Confirm Password"
                                    fullWidth
                                    required
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    name="email"
                                    value={reg.email}
                                    onChange={onChange}
                                    label="Email"
                                    fullWidth
                                    required
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="tel"
                                    name="tel"
                                    value={reg.tel}
                                    onChange={onChange}
                                    label="Telephone"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    name="name"
                                    value={reg.name}
                                    onChange={onChange}
                                    label="Name"
                                    fullWidth
                                    required
                                    inputProps={{ minLength: 2 }}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    name="surname"
                                    value={reg.surname}
                                    onChange={onChange}
                                    label="Surname"
                                    fullWidth
                                    required
                                    inputProps={{ minLength: 2 }}
                                    error={Boolean(errors.surname)}
                                    helperText={errors.surname}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={authClick}
                            fullWidth
                            color="primary"
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Grid>
                    {errors.server && (
                        <Grid item xs={12}>
                            <Typography variant="body2" color="error">
                                {errors.server}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography align="center">
                            {isLogin ? (
                                <>
                                    Нет аккаунта?{' '}
                                    <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                                </>
                            ) : (
                                <>
                                    Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                                </>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;
