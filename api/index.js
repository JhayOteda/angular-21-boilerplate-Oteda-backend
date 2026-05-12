// Force Vercel to bundle these dependencies
require('mysql2');
require('yamljs');
require('swagger-ui-express');

const server = require('../backend/server');
const app = server.default || server;
module.exports = app;
