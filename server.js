require('dotenv').config();
const app = require('./app');
const connectToDatabase = require('./db');

const startServer = async () => {
  try {
    await connectToDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

module.exports = startServer;