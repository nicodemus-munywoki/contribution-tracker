import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './src/config/db.config.js';
import mainRoutes from './src/routes/main.route.js';
import contributionRoutes from './src/routes/contribution.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', mainRoutes);
app.use('/api/contribution', contributionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});