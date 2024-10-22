const scrapeTranscript = async (page) => {
	try {
		// Set a custom timeout for this action only
		// page.setDefaultTimeout(5000);

		// Navigate to the transcript page
		await page.click(
			'a[href="https://jinansystem.com/student/MyTranscript/index.php"]'
		);
		await page.waitForSelector("#AutoNumber2");

		// Scrape transcript data
		const transcript = await page.evaluate(() => {
			try {
				const transferred = [];
				const istransfer = document.querySelector("tr.admintable_light")
					? true
					: false;
				const trows = document.querySelectorAll("tr.admintable_light");

				trows.forEach((row, index) => {
					if (index === trows.length - 1) return;
					const code = row.children[0].textContent;
					const name = row.children[1].textContent;
					const credits = row.children[2].textContent;
					transferred.push({ code, name, credits });
				});

				const semesters = [];
				const srows = document.querySelectorAll("tr.header_admin");

				srows.forEach((row, index) => {
					const courses = [];
					if (index === 0 || (index === 1 && istransfer === true))
						return;
					const title = row.textContent;
					let nextRow = row.nextElementSibling.nextElementSibling;

					while (nextRow && nextRow.children.length == 5) {
						const cells = nextRow.querySelectorAll("td");
						if (cells.length < 5) return;
						const code = cells[0].textContent.trim();
						const name = cells[1].textContent.trim();
						const credits = cells[2].textContent
							.trim()
							.split(".")[0];
						const grade = cells[3].textContent.trim().split(" ")[0];
						const average = cells[4].textContent.trim();
						courses.push({ code, name, credits, grade, average });
						nextRow = nextRow.nextElementSibling;
					}

					const extractData = (row) => {
						return {
							attempted: row.children[1].textContent.trim(),
							passed: row.children[2].textContent.trim(),
							average: row.children[3].textContent.trim(),
						};
					};

					const trow = nextRow.querySelectorAll("tr")[1];
					const current = [extractData(trow)];
					const crow = trow.nextElementSibling;
					const cumulative = [extractData(crow)];
					semesters.push({ title, courses, current, cumulative });
				});

				return { transferred, semesters };
			} catch (error) {
				throw new Error("Failed to scrape transcript information");
			}
		});

		return transcript;
	} catch (error) {
		console.error("Error in scrapeTranscript:", error);
		throw error;
	}
};

module.exports = {
	scrapeTranscript,
};
