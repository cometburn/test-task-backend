require('dotenv').config();

const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cookieSession({
  secret: process.env.REFRESH_TOKEN_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secureProxy: true,
    httpOnly: false,
    domain: process.env.API,
  },
}));

app.use(cors({
  origin: process.env.API,
  credentials: true,
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const checkinRoutes = require('./routes/checkin');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/checkins', checkinRoutes);
app.use('/api/users', userRoutes);

// const fixturesLoader = require('./db/fixtures/index');

// fixturesLoader.loadFixtures();

app.listen(PORT, '0.0.0.0', () => { console.log(`Server Started on Port: ${PORT}`); });
