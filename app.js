require('dotenv').config();

const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8081;

const corsOptions = {
  origin: [process.env.API, 'http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const checkinRoutes = require('./routes/checkin');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/checkins', checkinRoutes);

// const fixturesLoader = require('./db/fixtures/index');

// fixturesLoader.loadFixtures();

app.listen(PORT || 8081, '127.0.0.1', () => { console.log(`Server Started on Port: ${PORT}`); });
