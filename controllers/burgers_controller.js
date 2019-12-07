const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

router.get("/burgers", (req, res) => {
    burger.all(data => {
        res.json({ burgers: data });
        // console.log(data);
    });
});

// I BELIEVE THE BUG IS COMING FROM HERE!!!!
router.post("/burgers", (req, res) => {
    burger.create([
        "burger_name", "devoured" // removed devoured
    ], [
        req.body.burger_name, req.body.devoured // I removed req.body.devoured
    ], (result) => {
        res.json({ id: result.insert.id });
    });
});

router.put("/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    // console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});

router.delete("burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    burger.delete(condition, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;