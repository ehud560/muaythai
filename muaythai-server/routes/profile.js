const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const _ = require("lodash");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.payload._id);
        if (!user) return res.status(404).send("No such user");
        res.status(200).send(_.pick(user, ["_id", "firstName", "lastName", "email", "phone", "isAdmin"]));
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;