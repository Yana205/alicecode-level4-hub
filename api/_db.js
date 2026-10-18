/* shared MongoDB connection for the hub's functions (files starting with _ are not routes) */
const { MongoClient } = require("mongodb");

let clientPromise = null;

/* the "alicecode" database, or null when MONGODB_URI isn't set */
function database() {
  if (!process.env.MONGODB_URI) return null;
  clientPromise = clientPromise || new MongoClient(process.env.MONGODB_URI).connect();
  return clientPromise
    .then(c => c.db(process.env.MONGODB_DB || "alicecode"))
    .catch(e => { clientPromise = null; throw e; }); // reconnect on the next request
}

module.exports = { database };
