const scrapeProfile = async (page) => {
	try {
		// Set a custom timeout for this action only
		page.setDefaultTimeout(5000);

		// Check if the session is still valid (if you're redirected to login page)
		if (await page.$('input[name="USER"]')) {
			throw new Error("Session expired");
		}

		// Scrape profile data
		const profile = await page.evaluate(() => {
			const tdElements = document.querySelectorAll(
				"td.admintable_light div"
			);
			const semesterOptions = document.querySelectorAll("option");

			if (!tdElements || tdElements.length === 0) {
				console.error("No td.admintable_light div elements found");
				return null;
			}

			if (!semesterOptions || semesterOptions.length === 0) {
				console.error("No option elements found");
				return null;
			}

			let semesters = Array.from(semesterOptions)
			.map((option) => option.textContent.trim())
			.map((option) => option.replace(/\s-\sTripoli$/, ""))
			.slice(1);

			let major = tdElements[2]?.textContent || "Unknown Major";

			if (major === "الفنون الإعلانية والتواصل البصري") {
				major = "Graphic Design";
			}

			return {
				id: tdElements[0]?.textContent || "Unknown ID",
				major: major,
				name: tdElements[3]?.textContent || "Unknown Name",
				campus: tdElements[4]?.textContent || "Unknown Campus",
				semesters: semesters,
			};
		});

		return profile;
	} catch (error) {
		console.error("Error in scrapeProfile:", error);
		throw error;
	}
};

module.exports = {
	scrapeProfile,
};
