const fwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {

    } catch (err) {
        res.status(401).json({ error: error | "Requête non authentifiée." });
    }
};