const express = require("express");
const db = require("../data/connection.js");

const router = express.Router();

router.get("/", (req, res) => {
	db("cars")
		.then(cars => {
			res.status(200).json(cars);
		})
		.catch(err => {
			res.status(500).json({ error: "there was an error fetching cars", err });
		});
});

// router.get("/", async (req, res) => {
//     try {
//         const cars = await db("cars");
//         res.status(200).json(cars);
//     } catch (err) {
//         res.status(500).json({ error: "there was an error fetching cars", err });
//     }
// })

router.post("/", (req, res) => {
    db("cars")
        .insert(req.body, "id")
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(newCar => {
                    res.status(201).json(newCar);
                })
                .catch(err => {
                    res.status(500).json({ message: "error posting car", err });
                });
    })
})

module.exports = router;