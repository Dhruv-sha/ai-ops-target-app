const axios = require('axios');

const guardianPlugin = (serviceName) => {
  return async (err, req, res, next) => {
    const errorMessage = err.message || "Unknown Error";
    
    console.log(`🛡️ Guardian Plugin: Reporting error from ${serviceName}...`);

    try {
      // Send the error to your existing Ingest API
      await axios.post('http://localhost:3000/api/logs/ingest', {
        serviceName: serviceName,
        level: 'ERROR',
        message: errorMessage,
        metadata: {
          path: req.path,
          method: req.method,
          stack: err.stack?.split('\n')[1].trim() // Sends the line number
        }
      });
    } catch (e) {
      console.error("❌ Guardian Plugin failed to report:", e.message);
    }

    // Continue to the normal Express error handler
    res.status(500).json({ error: "Internal Server Error" });
  };
};

module.exports = guardianPlugin;