import express from 'express';
import studentRoutes from './routes/students';
// import producerRoutes from './routes/producers';
// import adminRoutes from './routes/admin';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);
// app.use('/producers', producerRoutes);
// app.use('/admin', adminRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
