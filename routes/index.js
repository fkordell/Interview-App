// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();

// Route handling for documentation
router.use("/", require("./swagger"));
router.use("/companies", require("./companies"));
router.use("/users", require("./users"));
router.use("/schools", require("./schools"));
router.use("/interviews", require("./interviews"));

// Handle the root URL ("/")
router.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Logged in</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f2f5; /* Light gray background */
          min-height: 100vh; /* Ensure full viewport height */
          display: flex;
          justify-content: center; /* Center content horizontally */
          align-items: flex-start; /* Align content to the top of the viewport */
        }
    
        .container {
          max-width: 800px;
          margin-top: 80px; /* Adjusted margin-top */
          margin-bottom: 20px; /* Reduced margin-bottom */
          padding: 20px;
          background-color: #fff; /* White background */
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }
    
        .title {
          font-family: 'Roboto', sans-serif; /* Google Font Roboto */
          font-size: 48px; /* Increased font size */
          font-weight: 700; /* Added font weight for boldness */
          margin-bottom: 20px;
          color: #316ff6; /* Dark gray color */
          text-align: center;
        }
    
        .navigation-bar {
          text-align: center;
          margin-bottom: 30px; /* Increased margin-bottom for better separation */
        }
    
        .navigation-bar a {
          display: inline-block;
          color: #333; /* Dark gray color */
          text-decoration: none;
          font-size: 18px;
          margin: 0 15px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease; /* Added transition for smoother hover effect */
        }
    
        .navigation-bar a:hover {
          background-color: #e5e7eb; /* Lighter gray background on hover */
          color: #000; /* Change text color on hover */
        }
    
        .logout-button {
          display: block;
          width: 100px;
          margin: 20px auto; /* Center the button horizontally */
          padding: 12px;
          background-color: #ea4335; /* Google red color */
          color: #fff; /* White text color */
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          text-decoration: none; /* Remove underline */
          text-align: center;
        }
    
        .logout-button:hover {
          background-color: #d02818; /* Darker shade of Google red on hover */
        }
    
        .api-docs-link {
          color: #1877f2; /* Facebook blue color */
          text-decoration: none;
        }
    
        .api-docs-link:hover {
          text-decoration: none;
          font-weight: bold;
        }
    
        .subtext {
          font-size: 14px;
          margin-top: 20px;
          color: #999; /* Light grey color */
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="title">Logged in as: ${req.oidc.user.name}</div>
        <!-- Stylish UI Navigation Bar -->
        <div class="navigation-bar">
          <a href="https://interview-app-7mxc.onrender.com/companydetail">Companies</a>
          <a href="https://interview-app-7mxc.onrender.com/userdetail">Users</a>
          <a href="https://interview-app-7mxc.onrender.com/schooldetail">Schools</a>
          <a href="https://interview-app-7mxc.onrender.com/interviewdetail">Interviews</a>
        </div><br>
    
        <!-- Additional Links -->
        <div class="subtext">
          Check out <a href="https://interview-app-7mxc.onrender.com/profiledetail" class="api-docs-link">Profile</a>
        </div>
        <div class="subtext">
          Go to <a href="https://interview-app-7mxc.onrender.com/api-docs" class="api-docs-link">Api-Docs</a>
        </div>
        <div class="subtext">
          Go to <a href="https://interview-app-7mxc.onrender.com/graphql" class="api-docs-link">GraphQL</a>
        </div><br>
    
        <!-- Logout Button -->
        <a href="https://interview-app-7mxc.onrender.com/logout" class="logout-button">Log out</a>
      </div>
    </body>
    </html>
    
          `;

    // Send the HTML content as a response
    res.send(htmlContent);
  } else {
    const htmlContent2 = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Interview Application</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f2f5; /* Light gray background */
        }
    
        .container {
          max-width: 800px;
          margin: 80px auto 20px; /* Added margin-top and reduced margin-bottom */
          padding: 20px;
          background-color: #fff; /* White background */
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }
    
        .title {
          font-family: 'Roboto', sans-serif; /* Google Font Roboto */
          font-size: 48px; /* Increased font size */
          font-weight: 700; /* Added font weight for boldness */
          margin-bottom: 20px;
          color: #316FF6; /* Dark gray color */
          text-align: center;
        }
    
        .navigation-bar {
          text-align: center;
          margin-bottom: 30px; /* Increased margin-bottom for better separation */
        }
    
        .navigation-bar a {
          display: inline-block;
          color: #333; /* Dark gray color */
          text-decoration: none;
          font-size: 18px;
          margin: 0 15px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease; /* Added transition for smoother hover effect */
        }
    
        .navigation-bar a:hover {
          background-color: #e5e7eb; /* Lighter gray background on hover */
          color: #000; /* Change text color on hover */
        }
    
        .login-button {
          display: block;
          width: 100px;
          margin: 20px auto;
          padding: 12px;
          background-color: #316FF6; /* Blue color */
          color: #fff; /* White color */
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
        }
    
        .subtext {
          font-size: 14px;
          margin-bottom: 10px;
          color: #666; /* Gray color */
          text-align: center;
        }
    
        .api-docs-link {
          color: #0070c9; /* Blue color */
          text-decoration: none;
        }
    
        .api-docs-link:hover {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="title">Interview Application</div>
    
        <!-- Stylish UI Navigation Bar -->
        <div class="navigation-bar">
          <a href="https://interview-app-7mxc.onrender.com/companydetail">Companies</a>
          <a href="https://interview-app-7mxc.onrender.com/userdetail">Users</a>
          <a href="https://interview-app-7mxc.onrender.com/schooldetail">Schools</a>
          <a href="https://interview-app-7mxc.onrender.com/interviewdetail">Interviews</a>
        </div><br>
    
        <!-- API Docs Line -->
        <div class="subtext">*LOGGED OUT*<br><br> To make changes to the <a href="https://interview-app-7mxc.onrender.com/api-docs" class="api-docs-link">api-docs</a>, please log in.</div>
    
        <!-- Login Button -->
        <a href="https://interview-app-7mxc.onrender.com/login" class="login-button">Login</a><br>
    
        <!-- GraphQL Link -->
        <div class="subtext">Go to <a href="https://interview-app-7mxc.onrender.com/graphql" class="api-docs-link">GraphQL</a></div>
      </div>
    </body>
    </html>
    
    `;

    // Send the HTML content as a response
    res.send(htmlContent2);
  }
});

module.exports = router;
