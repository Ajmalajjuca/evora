import dotenv from 'dotenv';
import type { Server } from 'http';
import app from './app.js';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const server: Server = app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

process.on('unhandledRejection', (err: unknown) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  if (err instanceof Error) {
    console.error(err.name, err.message);
  } else {
    console.error(err);
  }
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
