require('dotenv').config();

const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// app.use(cookieSession({ secret: process.env.REFRESH_TOKEN_SECRET }));

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

// const count = (req, res, next) => {
//   req.session.count = req.session.count || 0;
//   req.session.count += 1;
//   next();
// };
// app.use(count);

app.use(cors({
  origin: process.env.API,
  credentials: true,
}));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', process.env.API);
//   // res.header('Access-Control-Allow-Headers',
//   //   'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie');
//   // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

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
