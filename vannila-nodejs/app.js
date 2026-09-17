const http = require("http");
const requestListener = require("./routes");

const server = http.createServer(requestListener);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
