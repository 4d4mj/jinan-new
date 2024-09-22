const { fetchProfile } = require('../lib/fetchProfile');
const { login } = require('../lib/scrapeLogin');

const userSessions = {}; // In-memory session store

const getProfile = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId || !userSessions[sessionId]) {
    console.log('Not authenticated');
    console.log('Session ID:', sessionId);
    console.log('User sessions:', userSessions);
    return res.status(401).send('Not authenticated');
  }

  try {
    const userSession = userSessions[sessionId];
    let { siteCookies, username, password, context } = userSession;

    console.log('username:', username);

    try {
      // Attempt to fetch the profile with the existing session cookies
      let profile = await fetchProfile(siteCookies, context);
      return res.status(200).json(profile);
    } catch (error) {
      if (error.message === 'Session expired') {
        console.log('Session expired, re-authenticating...');

        // Re-authenticate and update session cookies
        const { cookies, context: newContext } = await login(username, password);
        userSession.siteCookies = cookies;
        userSession.context = newContext;

        // Retry fetching the profile with the new session
        const profile = await fetchProfile(cookies, newContext);
        return res.status(200).json(profile);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data');
  }
};

module.exports = {
  getProfile,
};
