**Blogify**
Blogify is a full-stack blogging application that allows users to create, edit, and view blog posts with an intuitive UI. Built using Spring Boot for the backend and React for the frontend, Blogify integrates JWT authentication for secure access and provides a seamless user experience with dynamic and RESTful APIs.

Key Features
User Authentication: Secured with JWT-based authentication using Spring Security, ensuring only authorized users can access and modify content.
CRUD Functionality: Create, read, update, and delete blog posts with structured and scalable RESTful APIs.
Image Uploads: Supports image uploads alongside posts using MultipartFile and InputStream, allowing for dynamic media display.
Entity Management: Includes entity-specific payloads and an exception handler to manage general and resource-not-found exceptions gracefully.
Database Integration: Efficient data management with Spring Data JPA repositories, providing seamless data access and storage.
API Documentation: Integrated with Swagger for detailed API documentation, making it easier to explore and test the application.
Technologies Used
Backend: Spring Boot, Spring Security (JWT Authentication), Spring Data JPA
Frontend: React
Other: Swagger, Postman for API testing
Installation & Setup
Clone the repository.
Set up the backend by configuring the application properties.
Run the Spring Boot application and start the React frontend.
Access the Swagger documentation at /swagger-ui.html for API details.
