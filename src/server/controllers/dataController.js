const { v4: uuidv4 } = require("uuid");
const { scrapeLogin } = require("../lib/scrapeLogin");
const { scrapeProfile } = require("../lib/scrapeProfile");
const { scrapeCourses } = require("../lib/scrapeCourses");
const { scrapeTranscript } = require("../lib/scrapeTranscript");
const { scrapeCurriculum } = require("../lib/scrapeCurriculum");
const { scrapePayments } = require("../lib/scrapePayments");

const userSessions = {}; // In-memory session store

const combinedDataController = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Step 1: Perform login and get page
		const page = await scrapeLogin(username, password);

		// Step 2: Store the session data in memory
		const sessionId = uuidv4();
		userSessions[sessionId] = { username, password, page };

		// Initialize the result object
		let result = {
			sessionId, // Send sessionId in the response for future authentication
		};

		// Step 3: Fetch profile data
		try {
			const profile = await scrapeProfile(page);
			result.profile = profile;
		} catch (error) {
			console.error("Error fetching profile:", error);
			result.profileError = "Failed to fetch profile data";
		}

		try {
			const courses = await scrapeCourses(page);
			result.courses = courses;
		} catch (error) {
			console.error("Error fetching courses:", error);
			result.coursesError = "Failed to fetch courses data";
		}

		try {
			const transcript = await scrapeTranscript(page);
			result.transcript = transcript;
		} catch (error) {
			console.error("Error fetching transcript:", error);
			result.transcriptError = "Failed to fetch transcript data";
		}

		try {
			const curriculum = await scrapeCurriculum(page);
			result.curriculum = curriculum;
		} catch (error) {
			console.error("Error fetching curriculum:", error);
			result.curriculumError = "Failed to fetch curriculum data";
		}

		try {
			const payments = await scrapePayments(page);
			result.payments = payments;
		} catch (error) {
			console.error("Error fetching payments:", error);
			result.paymentsError = "Failed to fetch payments data";
		}

		// Add more API calls here as needed, like fetching grades, etc.

		// Step 5: Send the aggregated result back to the client
		res.status(200).json(result);
	} catch (error) {
		console.error("Error during login or data fetching:", error);
		res.status(500).json({
			message: "Error during data collection",
			error,
		});
	}
};

module.exports = {
	combinedData: combinedDataController,
};
