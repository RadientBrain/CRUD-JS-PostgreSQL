const { Client } = require("pg");
const client = new Client({
  connectionString: "postgresql://postgres:chetan@localhost/postgres"
});

client.connect();

module.exports = client;