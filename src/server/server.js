const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const routes = require('./routes');

// Create a Redis client
const redisClient = redis.createClient();

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true, // Allow cookies to be sent with requests
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Set up express-session with RedisStore for persistent sessions
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false, // Prevent resaving unmodified sessions
  saveUninitialized: false, // Only save sessions when modified
  cookie: {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 30, // Session expires after 30 minutes of inactivity
  },
}));

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
