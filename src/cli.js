const queryUniqueAddresses = require("./queries/queryUniqueAddresses");

require("yargs")
  .scriptName("meta-trx-queries")
  .usage("$0 <cmd> [args]")
  .command(
    "query-unique-addresses [period]",
    "Get the amount of unique addresses that sent meta transactions over the last period of time",
    (yargs) => {
      yargs.positional("period", {
        type: "string",
        describe: "The period of time to query. Can be 'day', 'week', 'month' or 'year'",
      });
    },
    ({ period }) => {
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
          break;
        case "year":
          seconds = 31557600;
          break;
        default:
          console.log("Please specify a valid period of time (day, week, month or year)");
          return;
      }

      queryUniqueAddresses(seconds);
    }
  )
  .help().argv;
