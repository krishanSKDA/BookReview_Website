const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();

app.use(express.json());
app.use(cors());

// Allow CORS for frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Review routes
app.use("/reviews", reviewRoutes);

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Create User model
const User = mongoose.model("User", userSchema);

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { userId: user._id, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' }
  );

  res.json({ message: "Login successful!", token });
});

// Connect to DB
mongoose
  .connect(process.env.DB)
  .then(() => console.log('DB Connected'))
  .catch(err => {
    console.error('Error connecting to DB', err);
    process.exit(1);  
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
