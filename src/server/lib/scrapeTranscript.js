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
				const totaltransfer = document.querySelector(
					"tr.admintable_light:last-child td:last-child"
				).textContent;

				trows.forEach((row, index) => {
					if (index === trows.length - 1) return;
					const code = row.children[0].textContent;
					const name = row.children[1].textContent;
					const credits = row.children[2].textContent.replace(
						".00",
						""
					);
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
						let grade = cells[3].textContent.trim().split(" ")[0];
						if (grade === "IP") grade = null;
						let average = cells[4].textContent.trim();
						if (average === "IP") average = null;
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
					let current = extractData(trow);
					const crow = trow.nextElementSibling;
					let cumulative = extractData(crow);
					if (current.passed === "0" && current.average === "0.00") {
						current.average = null;
						current.passed = null;
					}
					semesters.push({ title, courses, current, cumulative });
				});

				const tables = document.querySelectorAll("table#AutoNumber2");

				const targetTable = tables[0];

				const directRows = targetTable.querySelectorAll(
					":scope > tbody > tr"
				);

				const targetRow = directRows[directRows.length - 2];

				const cells = targetRow.querySelectorAll("td.admintable_light");

				const totalCredits = cells[1]?.textContent.trim();
				const majorAverage = cells[2]?.textContent.trim();
				const average = cells[3]?.textContent.trim();
				return {
					totaltransfer,
					totalCredits,
					majorAverage,
					average,
					transferred,
					semesters,
				};
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
