// Middleware function to check if the user is authenticated
const authUserLogin = (req, res, next) => {
  // Check if the user is not authenticated
  if (!req.oidc.isAuthenticated()) {
    // If not authenticated, send a 401 Unauthorized status with an error message
    return res.status(401).send({
      error: "Unauthorized: Please login to make changes!",
      login: "You can log in at: http://localhost:8080/login",
    });
  }
  // If authenticated, call the next middleware function
  next();
};

// Export the middleware function to be used in other parts of the application
module.exports = { authUserLogin };
