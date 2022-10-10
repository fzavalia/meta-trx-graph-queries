module.exports.getRpc = () => {
  const value = process.env.RPC;

  if (!value) {
    throw new Error("RPC not defined");
  }

  return value;
};

module.exports.getMetaTrxQueryUrl = () => {
  const value = process.env.META_TRX_QUERY_URL;

  if (!value) {
    throw new Error("META_TRX_QUERY_URL not defined");
  }

  return value;
};
