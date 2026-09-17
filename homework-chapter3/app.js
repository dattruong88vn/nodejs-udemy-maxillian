const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes.handlerRoutes);

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
