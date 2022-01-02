import chalk from "chalk";
import figures from "figures";

export default {
  log: console.log,
  error: (...messages) => console.error(chalk.red(figures.cross, ...messages)),
  info: (...messages) => console.info(chalk.cyan(figures.info, ...messages)),
  success: (...messages) => console.log(chalk.green(figures.tick, ...messages)),
  warn: (...messages) =>
    console.log(chalk.yellow(figures.warning, ...messages)),
};
