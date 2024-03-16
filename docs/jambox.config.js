module.exports = {
  blockNetworkRequests: true,
  // A map of a original:destination host
  forward: {
    // Forward all admin requests to a local App
    "http://web-test-utils.com": {
      target: "http://127.0.0.1:3000",
      paths: [
        // Match all paths
        "**",
        // // Ignore the following paths, send them to the real server
        // "!**/graphql",
        // "!**/log",
      ],
      // Match websockets (support for NextJS local dev)
      websocket: true,
    },
  },
  stub: {
    "**/*.png": 204,
    // It's possible to respond with placeholder images instead of blank/broken 204s
    // Note that you must spcify a filepath, not file contents
    // "**/*.jpg": { status: 200, file: "./.jambox/placeholder.jpg", preferNetwork: true },
    "**/*.ico": 204,
    "**/log": { status: 200, statusMessage: "stub log" },
  },
  cache: {
    write: "auto",
    // Match a hostname + pathname string
    stage: ["**/graphql"],
    ignore: ["**/log"],
  },
};
