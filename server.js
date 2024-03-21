require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const { auth, requiresAuth } = require("express-openid-connect");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql");
const path = require("path");

const port = process.env.PORT || 8080;

//Update .env file with render link before pushing
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Protected route with requiresAuth middleware
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Routes setup
app.use("/", require("./routes"));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Protected route with requiresAuth middleware
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Error handling
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// Database connection and server start
db.mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `\nConnected to MongoDB and server running on port: ${port}\n`
      );
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define route handler for /companydetail
app.get("/companydetail", (req, res) => {
  // Serve the HTML content for company details
  res.sendFile(path.join(__dirname, "public", "companydetail.html"));
});

// Define route handler for /userdetail
app.get("/userdetail", (req, res) => {
  // Serve the HTML content for company details
  res.sendFile(path.join(__dirname, "public", "userdetail.html"));
});

// Define route handler for /schooldetail
app.get("/schooldetail", (req, res) => {
  // Serve the HTML content for company details
  res.sendFile(path.join(__dirname, "public", "schooldetail.html"));
});

// Define route handler for /interviewdetail
app.get("/interviewdetail", (req, res) => {
  // Serve the HTML content for company details
  res.sendFile(path.join(__dirname, "public", "interviewdetail.html"));
});

app.get("/profiledetail", (req, res) => {
  // Serve the HTML content for company details
  res.sendFile(path.join(__dirname, "public", "profiledetail.html"));
});

//GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
  })
);
//End GraphQL
