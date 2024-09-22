const { scrapeLogin } = require('../lib/scrapeLogin');
const { v4: uuidv4 } = require('uuid');

const userSessions = {}; // In-memory session store (use a proper session store for production)

const authController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Perform login and get session cookies and context
    const { cookies, context } = await scrapeLogin(username, password);

    // Generate a unique session ID
    const sessionId = uuidv4();

    // Store session data, including credentials, so we can re-login later if needed
    userSessions[sessionId] = {
      username,
      password, // Store the password securely or encrypted if in production
      siteCookies: cookies,
      context, // Store the context to reuse it
    };

    // Set the sessionId cookie in the user's browser
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: 'Lax',
    });

    // console.log('User sessions after login:', userSessions);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

module.exports = {
  userLogin: authController,
};
