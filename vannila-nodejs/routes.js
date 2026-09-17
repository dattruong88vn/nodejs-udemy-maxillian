const fs = require("fs");

const requestListener = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Welcome to the Home Page</h1>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="name" placeholder="Enter your name" /><input type="submit" value="Submit" /></form>',
    );
    return res.end();
  } else if (req.url === "/message" && req.method === "POST") {
    let chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    return req.on("end", () => {
      const body = Buffer.concat(chunks).toString();
      const name = body.split("=")[1];
      fs.writeFile("message.txt", `Hello, ${name}!`, (err) => {
        if (err) {
          res.statusCode = 500;
        } else {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      });
    });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
};

module.exports = requestListener;
