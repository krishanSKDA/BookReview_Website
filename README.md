# Book Review Application

## Overview
This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse, add, edit, and delete book reviews. It provides a platform for users to share their opinions on books and discover new reads through community reviews.

---

## Features
### User Authentication
- Users can sign up and log in to securely manage their reviews.

### Book Reviews
Each review includes:
- **Title**: The title of the book.
- **Author**: The author of the book.
- **Rating**: A rating from 1 to 5 stars.
- **Review Text**: A detailed review of the book.
- **Date Added**: The date when the review was submitted.

### RESTful API Endpoints
The backend API, built with Node.js and Express.js, provides the following endpoints:
- `GET /reviews`: Retrieve all book reviews.
- `GET /reviews/:id`: Retrieve a specific review by ID.
- `POST /reviews`: Create a new book review.
- `PUT /reviews/:id`: Update an existing review by ID.
- `DELETE /reviews/:id`: Delete a specific review by ID.

### User Interface
The frontend, developed using React.js, offers:
- **List View**: Displays all book reviews with options to edit and delete each review.
- **Review Form**: Allows users to create a new review or update an existing one.
- **Filtering and Sorting**: Filter reviews based on rating and sort them by the date added.

### Database
- **MongoDB**: Used as the database to store user and review information.
- Supports CRUD operations for managing book reviews.

### API Integration
- The React.js frontend communicates with the Express.js backend via RESTful API endpoints to perform all CRUD operations.

---

## Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed locally or access to a cloud MongoDB instance.

#### 1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Review

1. Backend Installation
   cd backend
   npm install
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   npm start 
1. Frontend Installation
   cd frontend
   npm install
   npm start

Notes
The MERN stack is used to demonstrate full-stack development skills, with a focus on API integration, responsive design, and efficient state management.
Assumptions:
Reviews are publicly visible to all users.
Only logged-in users can add, edit, or delete their reviews.
Additional features or enhancements may be implemented as time permits.
   
