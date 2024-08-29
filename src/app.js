const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { restoreSessions } = require('./sessions');
const { routes } = require('./routes');
const { maxAttachmentSize } = require('./config');

// Initialize Express app
const app = express();

// CORS configuration
app.use(cors());

// Body parser configuration
app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }));
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }));

// Register routes
app.use('/', routes);

// Restore sessions
restoreSessions();

// Disable 'x-powered-by' header
app.disable('x-powered-by');

module.exports = app;
