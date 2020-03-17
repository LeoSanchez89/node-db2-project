const express = require("express");
const db = require("../data/connection.js");

const router = express.Router();

// get all cars
router.get("/", (req, res) => {
	db("cars")
		.then(cars => {
			res.status(200).json(cars);
		})
		.catch(err => {
			res.status(500).json({ error: "there was an error fetching cars", err });
		});
});

// get car by id
router.get("/:id", (req, res) => {
	db("cars")
		.where({ id: req.params.id })
		.first()
		.then(car => {
			res.status(200).json(car);
		})
		.catch(err => {
			res.status(500).json({ message: "error fetching car data", err });
		});
});

// add new car
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
		});
});

// update car data
router.put("/:id", (req, res) => {
	db("cars")
		.where({ id: req.params.id })
		.update(req.body)
		.then(update => {
			db("cars")
				.where({ id: req.params.id })
				.then(newData => {
					res.status(201).json(newData);
				})
				.catch(err => {
					res.status(500).json({ message: "error updating car data", err });
				});
		});
});

// delete car
router.delete("/:id", (req, res) => {
	db("cars")
		.where({ id: req.params.id })
		.del()
		.then(del => {
			res.status(200).json({ message: "car deleted successfully" });
		})
		.catch(error => {
			res.status(500).json({ message: "error deleting car", error });
		});
});

module.exports = router;
