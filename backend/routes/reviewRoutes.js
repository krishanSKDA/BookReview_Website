const express = require("express");
const Review = require("../models/Review");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});  

// Get a specific review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new review
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a review by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch reviews with optional filters and sorting
router.get("/", async (req, res) => {
  try {
    const { rating, sortBy } = req.query;

    let query = {};
    if (rating) {
      query.rating = parseInt(rating); 
    }

    let sort = {};
    if (sortBy === "date") {
      sort.createdAt = -1; 
    }else if ( sortBy === "rating") {
      sort.rating = -1; 
    }

    const reviews = await Review.find(query).sort(sort);
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Add a new review (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newReview = new Review({ ...req.body, user: req.user.userId });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Edit a review (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
