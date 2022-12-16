require('dotenv').config();
// neo4j Driver
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(process.env.URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS))
const session = driver.session()
exports.session = session