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
      sqlDialect: "postgres",
      sqlConnectionSsl: true,
      // Unfortunately, Heroku free-tier does not have verifiable certificates.
      // See https://help.heroku.com/3DELT3RK/why-can-t-my-third-party-utility-connect-to-heroku-postgres-with-ssl for why.
      sqlDialectOptions: { ssl: { rejectUnauthorized: false } },
      sqlConnectionUrl: process.env.DATABASE_URL,
    },
  });

  logger.success(`Successfully started LCI server on port ${port}`);
} catch (err) {
  logger.error("Failed to start LCHI server");
  logger.error(`Reason: ${err.message}`);
  logger.error(`Error Stack: ${err.stack}`);
}
