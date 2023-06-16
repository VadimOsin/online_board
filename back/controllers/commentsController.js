const db = require("../db");
const moment = require("moment");

class CommentsController {
    async commentGetAll(req, res) {
        const { id } = req.params;
        try {
            const comments = await db.query(
                "SELECT * FROM comments WHERE id_ads = $1",
                [id]
            );
            if (comments.rows.length === 0) {
                return res.status(404).json({ message: "Comments not found" });
            }
            return res.json(comments.rows);
        } catch (err) {
            res.status(500).json({ message: "Error getting comments", error: err });
        }
    }

    async commentDelete(req, res) {
        const { id } = req.params;
        try {
            const deletedComment = await db.query(
                "DELETE FROM comments WHERE id_comments = $1 RETURNING *",
                [id]
            );
            if (deletedComment.rows.length === 0) {
                return res.status(404).json({ message: "Comment not found" });
            }
            return res.json({ message: "Comment deleted", comment: deletedComment.rows[0] });
        } catch (err) {
            res.status(500).json({ message: "Error deleting comment", error: err });
        }
    }

    async commentUpdate(req, res) {
        const { id } = req.params;
        const { text, title } = req.body;
        try {
            const updatedComment = await db.query(
                "UPDATE comments SET text = $1, title = $2 WHERE id_comments = $3 RETURNING *",
                [text, title, id]
            );
            if (updatedComment.rows.length === 0) {
                return res.status(404).json({ message: "Comment not found" });
            }
            return res.json({ message: "Comment updated", comment: updatedComment.rows[0] });
        } catch (err) {
            res.status(500).json({ message: "Error updating comment", error: err });
        }
    }

    async commentCreate(req, res) {
        try {
            let {
                title,
                text,
                date_created,
                id_person,
                id_ads
            } = req.body
            date_created = moment(date_created, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const newComment = await db.query(`INSERT INTO comments (title,
                                                                      text,
                                                                      date_created,
                                                                      id_person,
                                                                      id_ads)
                                               values ($1, $2, $3, $4, $5) RETURNING *`, [title,
                text,
                date_created,
                id_person,
                id_ads])

            res.json(newComment.rows[0])
        } catch (err) {
            res.status(400).json({message: "add comment error" + err})
        }
    }
}

module.exports = new CommentsController();
