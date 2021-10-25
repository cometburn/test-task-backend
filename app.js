require('dotenv').config();

const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [process.env.API, 'http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true,
  methods: 'GET, POST, PUT, DELETE',
};

app.set('trust proxy', 1);

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', process.env.API);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

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

app.listen(PORT, '0.0.0.0', () => { console.log(`Server Started on Port: ${PORT}`); });
