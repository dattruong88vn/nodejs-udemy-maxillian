const express = require("express");

const useRouter = require("./router/useRouter");
const { getMainModulePath } = require("./helpers/path");

const app = express();
const port = 3000;

// static middleware to serve static files from the "public" directory
app.use(express.static(getMainModulePath() + "/public"));
console.log(getMainModulePath() + "/public");

// Sample route
app.use("/", (req, res, next) => {
  console.log("Middleware executed");
  next(); // Call next() to pass control to the next middleware
});

app.use("/users", useRouter); // Use the router for /users routes

app.get("/", (req, res) => {
  console.log("Handling GET request for /");
  res.sendFile(getMainModulePath() + "/views/index.html");
});

app.use((req, res) => {
  console.log("Handling 404 error");
  res.status(404).sendFile(getMainModulePath() + "/views/404.html");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
