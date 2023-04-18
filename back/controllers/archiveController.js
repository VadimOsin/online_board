const db = require("..//db");

class ArchiveController {
    async archiveDeleteAds(req, res) {
        const { id } = req.params;
        try {
            const deletedArchive = await db.query("DELETE FROM archive WHERE id_archive = $1 RETURNING *", [id]);
            if (deletedArchive.rows.length === 0) {
                return res.status(404).json({ message: "Archive not found" });
            }
            return res.json({ message: "Archive deleted", archive: deletedArchive.rows[0] });
        } catch (err) {
            return res.status(500).json({ message: "Error deleting archive", error: err });
        }
    }

    async archiveAddAds(req, res) {
        const { id_ads } = req.body;
        try {
            const newArchive = await db.query("INSERT INTO archive (id_ads) VALUES ($1) RETURNING *", [id_ads]);
            return res.json({ message: "Archive created", archive: newArchive.rows[0] });
        } catch (err) {
            return res.status(500).json({ message: "Error creating archive", error: err });
        }
    }

    async archiveGetAll(req, res) {
        try {
            const archives = await db.query("SELECT * FROM archive");
            return res.json(archives.rows);
        } catch (err) {
            return res.status(500).json({ message: "Error getting archives", error: err });
        }
    }
}

module.exports = new ArchiveController();
