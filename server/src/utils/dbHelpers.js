const mongoose = require('mongoose');

/**
 * Check if database is connected
 */
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Get database connection status
 */
export const getConnectionStatus = () => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] || 'unknown';
};

/**
 * Close database connection
 */
export const closeConnection = async () => {
  await mongoose.connection.close();
};

/**
 * Clear database (useful for testing)
 */
export const clearDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
};
