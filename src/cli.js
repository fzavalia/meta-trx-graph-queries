const queryUniqueAddresses = require("./queries/queryUniqueAddresses");
const yargs = require("yargs")(process.argv.slice(2));

yargs
  .usage("Usage: $0 <command> [options]")
  .command({
    command: "*",
    handler: () => {
      yargs.showHelp();
    },
  })
  .command(
    "unique-address-count <period>",
    "Get the amount of Meta Transactions executed by different addresses over the last period of time",
    (yargs) => {
      yargs.positional("period", {
        choices: ["day", "week", "month"],
        description: "Period of time to query",
      });
      yargs.option("name", {
        type: "array",
        description: "Contract names to filter by",
        alias: "n",
      });
      yargs.option("not-name", {
        type: "array",
        description: "Contract names not to filter by",
      });
    },
    (argv) => {
      const period = argv.period;

      let seconds;

      switch (period) {
        case "day":
          seconds = 86400;
          break;
        case "week":
          seconds = 604800;
          break;
        case "month":
          seconds = 2629800;
      }

      let names = argv.name;
      let notNames = argv.notName;

      queryUniqueAddresses(seconds, { contractNameNotIn: notNames, contractNameIn: names });
    }
  ).argv;
