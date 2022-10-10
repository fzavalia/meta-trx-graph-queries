const fetch = require("node-fetch");
const { getRpc, getMetaTrxQueryUrl } = require("../config");

async function main(seconds, options = {}) {
  const timestampGT = (await getLatestBlockTimestamp()) - seconds;
  const metaTransactions = await getMetaTransactions([], timestampGT, options);

  console.log("Amount of Meta Transactions: " + metaTransactions.length);

  const uniqueAddresses = metaTransactions.reduce((acc, next) => {
    acc.add(next.userAddress);
    return acc;
  }, new Set());

  console.log("Amount of Unique Addresses sending Meta Transactions: " + uniqueAddresses.size);
}

async function getLatestBlockTimestamp() {
  const res = await fetch(getRpc(), {
    method: "POST",
    body: JSON.stringify({ jsonrpc: "2.0", method: "eth_getBlockByNumber", params: ["latest", false], id: 1 }),
  });

  return Number((await res.json()).result.timestamp);
}

async function getMetaTransactions(metaTransactions, timestampGT, options = {}) {
  let whereOptionals = "";

  const { timestampLT, contractNameNotIn, contractNameIn } = options;

  if (timestampLT) {
    whereOptionals += `, timestamp_lt: ${timestampLT}`;
  }

  if (contractNameNotIn) {
    whereOptionals += `, contractName_not_in: [${contractNameNotIn.join(", ")}]`;
  }

  if (contractNameIn) {
    whereOptionals += `, contractName_in: [${contractNameIn.join(", ")}]`;
  }

  const result = await fetch(getMetaTrxQueryUrl(), {
    method: "POST",
    body: JSON.stringify({
      query: `
        {
            metaTransactions(first: 1000, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestampGT}${whereOptionals} }) {
                id
                userAddress
                timestamp
            }
        }
        `,
    }),
  });

  const resultJson = await result.json();

  const {
    data: { metaTransactions: resultMetaTransactions },
  } = resultJson;

  const newMetaTransactions = [...metaTransactions, ...resultMetaTransactions];

  if (resultMetaTransactions.length === 1000) {
    return getMetaTransactions(newMetaTransactions, timestampGT, {
      ...options,
      timestampLT: resultMetaTransactions[resultMetaTransactions.length - 1].timestamp,
    });
  }

  return newMetaTransactions;
}

module.exports = main;
