# Blogify

Blogify is a full-stack blogging application that provides users with a secure, intuitive platform to create, view, edit, and delete blog posts. This project is designed with a scalable backend in Spring Boot and a responsive frontend in React, making it ideal for learning about web application architecture and secure data handling.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)

## Features

- **JWT Authentication**: Blogify utilizes Spring Security with JWT tokens to ensure secure access for registered users.
- **Complete CRUD Functionality**: Users can create, read, update, and delete blog posts.
- **Image Uploads**: Allows users to upload images for each post, enhancing the blogging experience.
- **Exception Handling**: Comprehensive error handling, including general exceptions and resource-not-found exceptions.
- **API Documentation**: Detailed API documentation provided via Swagger, simplifying exploration and testing.

## Technologies Used

- **Backend**: Spring Boot, Spring Security (JWT Authentication), Spring Data JPA
- **Frontend**: React
- **Other Tools**: Swagger for API documentation, Postman for testing

## Screenshots

### Login Page
![Login Page](screenshots/login-page.png)

### Blog List View
![Blog List View](screenshots/blog-list.png)

### Post Creation Page
![Post Creation Page](screenshots/post-creation.png)

### API Documentation
![API Documentation](screenshots/api-docs.png)

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm
- MySQL or any preferred relational database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/blogify.git
   cd blogify
