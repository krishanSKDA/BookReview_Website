import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import EditForm from "../components/EditForm";

function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [filterRating, setFilterRating] = useState(""); // State for filtering
  const [sortBy, setSortBy] = useState(""); // State for sorting

  // Fetch reviews from the backend with filters and sorting
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews", {
          params: { rating: filterRating, sortBy },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [filterRating, sortBy]); // Refetch when filterRating or sortBy changes

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSave = (updatedReview) => {
    setReviews((prev) =>
      prev.map((review) =>
        review._id === updatedReview._id ? updatedReview : review
      )
    );
    setEditingReview(null);
  };

  const handleCancel = () => {
    setEditingReview(null);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="nav">
        <a href="#" className="logo">BookRev.</a>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="/reviews">Review</a></li>
          <li className="dropdown">
            <a href="#" onClick={toggleDropdown}>Get Started</a>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Filtering and Sorting */}
        <div className="filter-sort-container">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="date">Newest First</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {/* Default Message or Reviews */}
        {reviews.length === 0 ? (
          <p className="default-message">
            Add your first book review to share your thoughts with the community!
          </p>
        ) : editingReview ? (
          <EditForm
            review={editingReview}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="reviews-container">
            <h3>Latest Reviews</h3>
            <div className="review-cards">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <h4 className="review-title">{review.title}</h4>
                  <div className="review-rating">
                  <p><strong>Author:</strong> {review.author}</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <p><strong>Review:</strong> {review.reviewText}</p>
                  <p><strong>Date:</strong> {new Date(review.dateAdded).toLocaleDateString()}</p>
                  </div>
                  <div className="review-actions">
                    <button onClick={() => setEditingReview(review)}>Edit</button>
                    <button
                      onClick={async () => {
                        try {
                          await axios.delete(
                            `http://localhost:5000/reviews/${review._id}`
                          );
                          setReviews((prev) =>
                            prev.filter((r) => r._id !== review._id)
                          );
                        } catch (error) {
                          console.error("Error deleting review:", error);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
