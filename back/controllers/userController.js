const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("..//db")

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const { login, password, email, telephone, name, surname } = req.body;

            console.log(req.body)
            if (!login || !password || !email || !telephone || !name || !surname) {
                return next(ApiError.badRequest('Пожалуйста, заполните все поля'));
            }

            const candidate = await db.query('SELECT * FROM person WHERE login = $1', [login]);
            if (candidate.rows.length > 0) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await db.query(
                'INSERT INTO person (login, password, role) VALUES ($1, $2, $3) RETURNING id_person',
                [login, hashPassword, 'USER']
            );

            await db.query(
                'INSERT INTO person_meta (email, telephone, name, surname, id_person) VALUES ($1, $2, $3, $4, $5)',
                [email, telephone, name, surname, user.rows[0].id_person]
            );

            const token = generateJwt(user.rows[0].id_person, login, 'USER');

            return res.json({ token });
        } catch (error) {
            return next(ApiError.internal('Ошибка при регистрации', error));
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const user = await db.query(`SELECT *
                                         FROM "person"
                                         where login = $1`, [login])
            if (!user.rows[0]) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.rows[0].id_person, user.rows[0].login, user.rows[0].role)
            return res.json({ token });
        } catch (e) {
            res.status(400).json({message: "login error"})
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

    async getUserInfo(req, res) {
        const userId = req.user.id;
        try {
            const user = await db.query(`
            SELECT p.id_person, p.login, p.role, pm.id_person_meta, pm.email, pm.telephone, pm.name, pm.surname
            FROM person p
            INNER JOIN person_meta pm ON p.id_person = pm.id_person
            WHERE p.id_person = $1
        `, [userId]);
            if (user.rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user.rows[0]);
        } catch (err) {
            return res.status(500).json({ message: "Error fetching user info", error: err });
        }
    }
}

module.exports = new UserController()
