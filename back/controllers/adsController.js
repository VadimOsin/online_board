const db = require("..//db")
const uuid = require("uuid")
const path = require("path")
const moment = require('moment');

class AdsController {
    async adsGetOne(req, res) {
        try {
            const {id} = req.params
            const ads = await db.query(`SELECT *
                                        FROM ads
                                        WHERE id_ads = $1`, [id])
            if (ads.rows.length === 0) {
                return res.status(404).json({message: `Ads with id ${id} not found`})
            }
            return res.json(ads.rows[0])
        } catch (e) {
            res.status(500).json({message: "Error getting ads"})
        }
    }

    async adsDelete(req, res) {
        try {
            const {id} = req.params
            const ads = await db.query(`DELETE
                                        FROM ads
                                        WHERE id_ads = $1 RETURNING *`, [id])
            if (ads.rows.length === 0) {
                return res.status(404).json({message: `Ads with id ${id} not found`})
            }
            return res.json({message: `Ads with id ${id} deleted successfully`})
        } catch (e) {
            res.status(500).json({message: "Error deleting ads"})
        }
    }

    async adsUpdate(req, res) {
        try {
            const {id} = req.params
            const {title, text, date_created, date_end, date_updated, likes, dislike, id_person} = req.body
            const ads = await db.query(`UPDATE ads
                                        SET title        = $1,
                                            text         = $2,
                                            date_created = $3,
                                            date_end     = $4,
                                            date_updated = $5,
                                            likes        = $6,
                                            dislike      = $7,
                                            id_person    = $8
                                        WHERE id_ads = $9 RETURNING *`, [title, text, date_created, date_end, date_updated, likes, dislike, id_person, id])
            if (ads.rows.length === 0) {
                return res.status(404).json({message: `Ads with id ${id} not found`})
            }
            return res.json(ads.rows[0])
        } catch (e) {
            res.status(500).json({message: "Error updating ads"})
        }
    }

    async adsCreate(req, res) {
        try {
            let {
                title,
                text,
                date_created,
                date_end,
                date_updated,
                likes,
                dislike,
                id_person
            } = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            date_created = moment(date_created, 'DD-MM-YYYY').format('YYYY-MM-DD');
            date_end = moment(date_end, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const newAds = await db.query(`INSERT INTO ads (title,
                                                            text,
                                                            url,
                                                            date_created,
                                                            date_end,
                                                            date_updated,
                                                            likes,
                                                            dislike,
                                                            id_person)
                                           values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [title,
                text,
                fileName,
                date_created,
                date_end,
                date_updated,
                likes,
                dislike,
                id_person])

            res.json(newAds.rows[0])
        } catch (err) {
            res.status(400).json({message: "add ads error" + err})
        }
    }
}

module.exports = new AdsController()
