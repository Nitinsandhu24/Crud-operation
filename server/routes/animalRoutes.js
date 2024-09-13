const express = require("express");
const Animal = require("../Model/Animal.js");
const router = express.Router();

// GET all animals
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new animal
router.post("/", async (req, res) => {
  const { name, species, age } = req.body;
  const animal = new Animal({ name, species, age });

  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update an animal
router.put("/:id", async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnimal)
      return res.status(404).json({ message: "Animal not found" });
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an animal
router.delete("/:id", async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal)
      return res.status(404).json({ message: "Animal not found" });
    res.json({ message: "Animal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
