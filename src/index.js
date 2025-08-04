import http from "http";
import app from "./app/app.js";

// import config files
import env from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import logger from "./config/logger.config.js";

function main() {
  try {
    const server = http.createServer(app);
    const PORT = Number(env.PORT ?? 8080);

    connectDB()
      .then(() => {
        server.listen(PORT, () => {
          logger.info(`\n ⚙️ Server is running on ${PORT}`);
        });
      })
      .catch((err) => {
        logger.error(`\n ❌ Mongodb connection error: ${err.message}`);
      });
  } catch (error) {
    logger.error("\n ❌ Server error:", error.message);
  }
}

main();
