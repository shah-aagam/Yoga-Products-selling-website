const cluster = require("cluster");
const os = require("os");
const { createServer } = require("http");
const next = require("next");

const numCPUs = os.cpus().length; // Get number of CPU cores
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if they die
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Restarting...`);
    cluster.fork();
  });
} else {
  const app = next({ dev: isDev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = createServer((req, res) => {
      handle(req, res);
    });

    server.listen(port, () => {
      console.log(`Worker process ${process.pid} is listening on port ${port}`);
    });
  });
}
