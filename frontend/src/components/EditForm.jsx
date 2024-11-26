import React, { useState } from "react";
import axios from "axios";
import "./EditForm.css"; 

function EditForm({ review, onSave, onCancel }) {
  const [updatedReview, setUpdatedReview] = useState({
    title: review.title,
    author: review.author,
    rating: review.rating,
    reviewText: review.reviewText,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/reviews/${review._id}`,
        updatedReview
      );
      onSave(response.data); 
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="edit-form-container">
      <form onSubmit={handleFormSubmit} className="edit-form">
        <h3>Edit Review</h3>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={updatedReview.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={updatedReview.author}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={updatedReview.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </label>
        <label>
          Review:
          <textarea
            name="reviewText"
            value={updatedReview.reviewText}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
