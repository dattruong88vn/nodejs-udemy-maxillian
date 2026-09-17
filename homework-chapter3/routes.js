const fs = require("fs");

const handlerRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  // route /
  if (url === "/" && method === "GET") {
    return homeRoute(req, res);
  }

  //   route / users;
  if (url === "/users" && method === "GET") {
    return usersRoute(req, res);
  }

  // route /create-user
  if (url === "/create-user" && method === "POST") {
    return createUserRoute(req, res);
  }
};

const homeRoute = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Home</title></head>");
  res.write("<body>");
  res.write("<h1>Welcome to the Home Page</h1>");
  res.write("<form action='/create-user' method='POST'>");
  res.write(
    "<input type='text' name='username' placeholder='Enter username' required>",
  );
  res.write("<button type='submit'>Create User</button>");
  res.write("</form>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
};

const usersRoute = (req, res) => {
  const users = fs
    .readFileSync("users.txt", "utf8")
    .split("\t")
    .filter(Boolean);
  console.log("Users read from file:", users);

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Users</title></head>");
  res.write("<body>");
  res.write("<h1>List of Users</h1>");
  res.write("<ul>");
  for (const user of users) {
    res.write(`<li>${user}</li>`);
  }
  res.write("</ul>");
  res.write("<a href='/'>Create User</a>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
};

const createUserRoute = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const username = parsedBody.split("=")[1];
    console.log("Username received:", username);

    // write the username to a file (for demonstration purposes)
    fs.appendFile("users.txt", `${username}\t`, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }
      console.log("Username saved to users.txt");
    });

    // Redirect to /users after creating the user
    res.statusCode = 302;
    res.setHeader("Location", "/users");
    return res.end();
  });
};

module.exports = {
  handlerRoutes,
};
