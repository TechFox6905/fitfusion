const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck route
const healthcheckRoutes = require('./api/healthcheck');
app.use('/api', healthcheckRoutes);

module.exports = app;
