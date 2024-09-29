import { myAxios } from "./helper";

// Function to handle user registration
export const signUp = (user) => {
    return myAxios
        .post("/api/v1/auth/register", user) // Make sure the API endpoint matches your backend
        .then((response) => response.data) // Return the response data
        .catch((error) => {
            console.error("Registration failed:", error);
            throw error; // Rethrow error to be handled in the calling component
        });
}

// Function to handle user login
export const loginUser = (loginDetail) => {
    return myAxios
        .post('/api/v1/auth/login', loginDetail) // Make sure the API endpoint matches your backend
        .then((response) => response.data) // Return the response data
        .catch((error) => {
            console.error("Login failed:", error);
            throw error; // Rethrow error to be handled in the calling component
        });
}

// Function to get user details by user ID
export const getUser = (user_id) => {
    return myAxios
        .get(`/api/users/${user_id}`) // Make sure the API endpoint matches your backend
        .then((response) => response.data) // Return the response data
        .catch((error) => {
            console.error("Failed to fetch user:", error);
            throw error; // Rethrow error to be handled in the calling component
        });
}
