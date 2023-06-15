import React, { useState } from 'react';
import {
    Typography,
    Container,
    Box,
    TextField,
    Button,
} from '@mui/material';

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        password: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Изменить данные пользователя
                </Typography>

                    <TextField
                        label="Имя"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Фамилия"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        fullWidth
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Телефон"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Сохранить изменения
                    </Button>

            </Container>
        </Box>
    );
};

export default EditProfile;
