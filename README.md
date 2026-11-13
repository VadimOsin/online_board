# Online Board — доска объявлений

Fullstack-приложение: публикация и обсуждение объявлений.

**Демо:** https://online-board.netlify.app/

## Возможности

- Регистрация и вход (JWT)
- Создание, редактирование и архивирование объявлений
- Фильтрация объявлений
- Комментарии

## Стек

**Frontend:** React · MUI · React Router · Axios  
**Backend:** Node.js · Express · PostgreSQL · JWT

## Запуск

```bash
# backend
cd back
npm install
cp .env.example .env        # доступ к PostgreSQL и SECRET_KEY
psql -d online_board -f models/model.sql   # схема БД
npm start

# frontend
cd front
npm install
cp .env.example .env
npm start
```
