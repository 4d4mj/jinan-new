const scrapeCurriculum = async (page) => {
	try {
		// Navigate to the curriculum page
		await page.click(
			'a[href="https://jinansystem.com/student/MyCurriculum/index.php"]'
		);
		await page.waitForSelector("#AutoNumber2");

		// Scrape curriculum data
		const curriculum = await page.evaluate(() => {
			try {
				const table = document.querySelector(
					"table#AutoNumber2 > tbody > tr > th > table:last-child"
				);
				if (!table) throw new Error("Table not found");

				const rows = table.querySelectorAll("tr.header_admin");
				let general = [];
				let elective = [];
				let major = [];

				// Helper function to collect rows in each section, skipping the label row
				const getSectionRows = (startRow) => {
					const sectionRows = [];
					let currentRow = startRow.nextElementSibling;
					let isFirstRow = true;

					while (currentRow && !currentRow.classList.contains("header_admin")) {
						if (!isFirstRow) {
							if (
								currentRow.children.length > 4 &&
								currentRow.classList.contains("admintable_light")
							) {
								sectionRows.push(currentRow);
							}
						} else {
							isFirstRow = false;
						}
						currentRow = currentRow.nextElementSibling;
					}
					return sectionRows;
				};

				// Extract data for each section
				const generalEducationRows = getSectionRows(rows[1]);
				const generalElectivesRows = getSectionRows(rows[2]);
				const majorRequirementsRows = getSectionRows(rows[3]);

				// Helper function to extract data from each row
				const extractRowData = (row) => {
					const cells = row.querySelectorAll("td");
					const status = cells[4]?.textContent.trim();
					const semester = cells[3]?.textContent.trim() || (status === "New" ? "New" : status === "Transfer" ? "Transfer" : null);

					return {
						code: cells[0]?.textContent.trim(),
						title: cells[1]?.textContent.trim(),
						credits: parseFloat(cells[2]?.textContent.trim()) || 0, // Convert credits to float
						semester,
						status,
					};
				};

				// Map each row in the section to extract the data
				general = generalEducationRows.map(extractRowData);
				elective = generalElectivesRows.map(extractRowData);
				major = majorRequirementsRows.map(extractRowData);

				// Helper function to sort courses by status (Passed, Registered, New)
				const sortCourses = (courses) => {
					return courses.sort((a, b) => {
						const statusOrder = { "Transfer": 1, "Passed": 2, "Registered": 3, "New": 4 };
						return statusOrder[a.status] - statusOrder[b.status];
					});
				};

				// Sort each category
				general = sortCourses(general);
				elective = sortCourses(elective);
				major = sortCourses(major);

				// Calculate total credits for each section
				const totalGeneral = general.reduce((sum, row) => sum + row.credits, 0);
				const totalElective = elective.reduce((sum, row) => sum + row.credits, 0);
				const totalMajor = major.reduce((sum, row) => sum + row.credits, 0);

				// Select the second-last admintable_dark separator row and move to next sibling
				const allDarkSeparators = table.querySelectorAll("tr.admintable_dark");
				let totalElement = allDarkSeparators[allDarkSeparators.length - 2]?.nextElementSibling;

				// Initialize an array to store the totals
				const totals = [];

				// Scrape totals rows until no more rows are available
				while (totalElement && totalElement.children.length > 1) {
					totals.push({
						title: totalElement.children[0]?.textContent.trim(),
						credits: parseFloat(totalElement.children[1]?.textContent.trim()) || 0,
					});
					totalElement = totalElement.nextElementSibling;
				}

				// Return final curriculum object with totals
				return {
					general,
					elective,
					major,
					totalGeneral,
					totalElective,
					totalMajor,
					totals,
				};
			} catch (error) {
				throw new Error("Failed to scrape curriculum information");
			}
		});
		return curriculum;
	} catch (error) {
		console.error("Error in scrapeCurriculum:", error);
		throw error;
	}
};

module.exports = {
	scrapeCurriculum,
};
