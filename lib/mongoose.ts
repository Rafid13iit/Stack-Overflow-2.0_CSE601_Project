import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    throw new Error('MISSING MONGODB_URI: Please add MongoDB URL to environment variables');
  }

  if (isConnected) {
    return console.log('Using existing MongoDB connection');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Stack_Overflow_2',
      // Add timeout configurations
      serverSelectionTimeoutMS: 5000,    // Timeout for server selection
      socketTimeoutMS: 45000,            // How long to wait for responses
      connectTimeoutMS: 10000,           // How long to wait for initial connection
      // Add additional helpful configurations
      maxPoolSize: 10,                   // Maintain up to 10 socket connections
      minPoolSize: 1,                    // Maintain at least 1 socket connection
      retryWrites: true,                 // Retry failed writes
      retryReads: true,                  // Retry failed reads
      // Add heartbeat configurations
      heartbeatFrequencyMS: 10000,       // How often to check connection status
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    isConnected = false;
    
    // Enhanced error handling
    if (error instanceof Error) {
      if (error.name === 'MongoServerSelectionError') {
        console.error('Failed to connect to MongoDB server. Please check if your MongoDB instance is running and accessible.');
      } else if (error.name === 'MongoTimeoutError') {
        console.error('MongoDB connection timed out. Please check your network connection and MongoDB server status.');
      } else {
        console.error('MongoDB connection failed:', error.message);
      }
    } else {
      console.error('An unexpected error occurred while connecting to MongoDB:', error);
    }
    
    // Optionally, throw the error to be handled by the caller
    throw error;
  }
};

// Add a disconnect function for cleanup
export const disconnectFromDatabase = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
};

// Add a helper to check connection status
export const isDatabaseConnected = () => isConnected;