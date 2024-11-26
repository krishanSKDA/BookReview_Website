import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEditReview.css"; 

const AddEditReview = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: 1,
    reviewText: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchReview();
    }
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/reviews/${id}`, formData);
      } else {
        await axios.post("http://localhost:5000/reviews", formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="review-form">
        <h2>{id ? "Edit Review" : "Add Review"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating"
          max="5"
          min="1"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
        <textarea
          placeholder="Write your review..."
          value={formData.reviewText}
          onChange={(e) =>
            setFormData({ ...formData, reviewText: e.target.value })
          }
        />
        <button type="submit">{id ? "Update" : "Add"} Review</button>
      </form>
    </div>
  );
};

export default AddEditReview;
