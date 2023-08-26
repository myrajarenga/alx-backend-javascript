// Import the 'http' module to create an HTTP server
const http = require('http');

// Define the port and host for the server
const PORT = 1245;
const HOST = 'localhost';

// Create an HTTP server instance
const app = http.createServer();

// Handle incoming HTTP requests
app.on('request', (_, res) => {
  // Define the response text to send to clients
  const responseText = 'Hello Holberton School!';

  // Set HTTP response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);

  // Set the HTTP status code to 200 (OK)
  res.statusCode = 200;

  // Write the response text to the response stream
  res.write(Buffer.from(responseText));
});

// Start the HTTP server and listen on the specified port and host
app.listen(PORT, HOST, () => {
  // Log a message to the console when the server starts
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

// Export the 'app' object for use in other modules
module.exports = app;
