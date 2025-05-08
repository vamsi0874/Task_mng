import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectToDb } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { app, io, server } from './lib/socket.js';

dotenv.config();

connectToDb();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/reports',reportRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
