import { createServer } from "@lhci/server";
import logger from "./logger.mjs";

try {
  logger.info("Attempting to start LCHI server...");
  const { port } = await createServer({
    port: process.env.PORT,
    basicAuth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    storage: {
      storageMethod: "sql",
      sqlDialect: "sqlite",
      sqlDatabasePath: "./db.sql",
    },
  });
  logger.success(`Succseefully started LCHI server on port ${port}`);
} catch (err) {
  logger.error("Failed to start LCHI server", err);
}
