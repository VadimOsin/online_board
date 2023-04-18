import React, { useContext, useState} from 'react';
import './login.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/userContext";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/const";
import RedirectModal from "../redirectModal/redirectModal";
import {login, registration} from "../../axios/userApi";


const Login = () => {
    const location = useLocation()
    let navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {signIn} = useContext(UserContext);
    const [reg, setReg] = useState({
        login: '',

        password: '',

        email: '',

        tel: '',

        role: '',

        name: '',

        surname: ''
    });

    const [modal, setModal] = useState({
        title: '',
        text: '',
        isOpen: false
    })
    const handleCloseModal = () => {
        setModal({...modal, isOpen: false});
    };

    const onReset = () => {
        setReg({
            login: '',

            password: '',

            email: '',

            tel: '',

            role: '',

            name: '',

            surname: ''
        })
    };
    const onChange = ({target: {name, value}}) => {
        setReg({...reg, [name]: value})
    };
    const isEmailValid = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };
    const authClick = async () => {
        if (!isLogin) {

            if (!reg.email || !isEmailValid(reg.email)) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите корректный email", isOpen: true});
                return;
            }
            if (!reg.password || reg.password.length < 8 || reg.password.length > 12) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите пароль от 8 до 12 символов", isOpen: true});
                return;
            }
            if (!reg.name || reg.name.length < 2) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите имя (минимум 2 символа)", isOpen: true});
                return;
            }
            if (!reg.surname || reg.surname.length < 2) {
                setModal({title: 'Ошибка при регистрации!', text: "Введите фамилию (минимум 2 символа)", isOpen: true});
                return;
            }
        }

        let data
        if (isLogin) {
            data = await login(reg.login, reg.password)
                .catch(
                    error => {
                        setModal({
                            title: 'Повторите попытку',
                            text: `${error.message}`,
                            isOpen: true
                        });
                    }
                );
            signIn(data.id, data.login, data.password, data.role)
            setModal({
                title: 'Вход выполнен!',
                text: "Подождите вас перенаправит на главную страницу",
                isOpen: true
            });
            setTimeout(() => {
                setModal({
                    title: 'Вход выполнен!',
                    text: "Подождите вас перенаправит на главную страницу",
                    isOpen: false
                });
            }, 1000)
            navigate("/")
        } else {
            const formData = new FormData()
            formData.append('login', reg.login)
            formData.append('password', reg.password)
            formData.append('email', reg.email)
            formData.append('telephone', reg.tel)
            formData.append('role', 'USER')
            formData.append('name', reg.name)
            formData.append('surname', reg.surname)
            data = await registration(formData).catch(
                error => {
                    setModal({
                        title: 'Повторите попытку',
                        text: `${error.message}`,
                        isOpen: true
                    });
                }
            );
            signIn(data.id, data.login, data.password, data.role)
            setModal({
                title: 'Регистрация прошла успешно!',
                text: "Подождите вас перенаправит на главную страницу",
                isOpen: true
            });
            setTimeout(() => {
                setModal({
                    title: 'Регистрация прошла успешно!',
                    text: "Подождите вас перенаправит на главную страницу",
                    isOpen: false
                });
            }, 1000)
            navigate("/")
        }

    };


    return (
        <div className='auth'>
            <div className='auth__item'>
                <div className="login__field">
                    <input type="text" className="login__input" name='login' value={reg.login} onChange={onChange}
                           placeholder='Login' required/>
                </div>
                <div className="login__field">
                    <input type="password" className="login__input" name='password' value={reg.password}
                           onChange={onChange} placeholder='Password' required min={8} max={12}/>
                </div>
                {
                    isLogin ? '' : <div>
                        <div className="login__field">
                            <input type="email" className="login__input" name='email' value={reg.email} onChange={onChange}
                                   placeholder='Email' required/>
                        </div>
                        <div className="login__field">
                            <input type="tel" className="login__input" name='tel' value={reg.tel} onChange={onChange}
                                   placeholder='Telephone' required/>
                        </div>
                        <div className="login__field">
                            <input type="name" className="login__input" name="name" value={reg.name}
                                   onChange={onChange} placeholder='Name' required min={2}/>
                        </div>
                        <div className="login__field">
                            <input type="surname" className="login__input" name="surname" value={reg.surname}
                                   onChange={onChange} placeholder='Surname' required min={2}/>
                        </div>
                    </div>
                }
                <div className='login__btn'>
                    <button className="button login__submit" onClick={authClick}>
                        <span className="button__text">{isLogin ? 'Войти' : "Зарегистрироваться"} </span>
                    </button>
                    <button className="button login__reset" onClick={onReset}>
                        <span className="button__text">Очистить</span>
                    </button>
                </div>
                <span className="button__text">
                {isLogin ?
                    <div>
                        Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                    </div>
                }
                </span>
            </div>

            <RedirectModal
                title={modal.title}
                children={modal.text}
                isOpen={modal.isOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Login;