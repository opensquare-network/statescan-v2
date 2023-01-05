async function getEndpoints() {
  const ipfsGatewayUrls = (
    process.env.IPFS_GATEWAY_URLS || "https://ipfs.io/ipfs/"
  ).split(";");

  return ipfsGatewayUrls.map((url) => {
    if (url.endsWith("/")) {
      return url;
    } else {
      return `${url}/`;
    }
  });
}

module.exports = {
  getEndpoints,
};
