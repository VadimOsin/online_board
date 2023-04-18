const db = require("..//db");

class BoardController {
    async boardDeleteAds(req, res, next) {
        const { id } = req.params;
        try {
            const deletedAd = await db.query("DELETE FROM board WHERE id_board = $1 RETURNING *", [id]);
            if (deletedAd.rows.length === 0) {
                return res.status(404).json({ message: "Ad not found in the board" });
            }
            return res.json({ message: "Ad deleted from the board", ad: deletedAd.rows[0] });
        } catch (err) {
            return res.status(500).json({ message: "Error deleting ad from the board", error: err });
        }
    }

    async boardAddAds(req, res) {
        const { id } = req.params;
        try {
            const addedAd = await db.query("INSERT INTO board (id_ads) VALUES ($1) RETURNING *", [id]);
            return res.json({ message: "Ad added to the board", ad: addedAd.rows[0] });
        } catch (err) {
            return res.status(500).json({ message: "Error adding ad to the board", error: err });
        }
    }

    async boardGetAll(req, res) {
        try {
            const ads = await db.query(`
        SELECT a.*, COALESCE(b.id_board, 0) AS in_board, COALESCE(ar.id_archive, 0) AS in_archive
        FROM ads a
        LEFT JOIN board b ON a.id_ads = b.id_ads
        LEFT JOIN archive ar ON a.id_ads = ar.id_ads
      `);
            return res.json({ ads: ads.rows });
        } catch (err) {
            return res.status(500).json({ message: "Error getting ads", error: err });
        }
    }
}

module.exports = new BoardController();