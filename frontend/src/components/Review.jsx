import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  "./Review.css";
const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Book Reviews</h1>
      <Link to="/edit" className="add-review-button">Add Review</Link>

    </div>
  );
};

export default HomePage;
