const scrapeCourses = async (page) => {
	try {
		const options = await page.evaluate(() => {
			const selectElement = document.querySelector('select[name="semId"]');
			return Array.from(selectElement.options)
				.map((option, index) => ({
					index,
					value: option.value,
					text: option.textContent,
				}))
				.slice(1);
		});

		const allCoursesBySemester = [];

		for (const option of options) {
			await page.selectOption('select[name="semId"]', option.value);
			await page.waitForSelector(".table_main");

			const courses = await page.evaluate(() => {
				const table = document.querySelectorAll(".table_main")[1];
				const rows = table.querySelectorAll(".admintable_light");

				return Array.from(rows).map((row) => {
					const code = row.querySelector(":nth-child(3)").textContent;
					const name = row.querySelector(":nth-child(4)").textContent;
					const credits = parseFloat(row.querySelector(":nth-child(5)").textContent.split(".")[0]);
					let type = row.querySelector(":nth-child(6)").textContent;
					if (type === "GERElective") {
						type = "Elective";
					} else if (type === "GER") {
						type = "General";
					}
					const grade = parseFloat(row.querySelector(":nth-child(7)").textContent);
					return { code, name, credits, type, grade };
				});
			});

			const scheduleLink = await page.evaluate(() => {
				const linkElement = document.querySelector('a[href*="printSchedule"]');
				return linkElement ? linkElement.href : null;
			});

			// Calculate totals for credits and average grade
			const totalCreditsAttempted = courses.reduce((sum, course) => sum + course.credits, 0).toString();
			const totalCreditsPassed = courses
				.filter((course) => course.grade >= 2.00) // Assuming 2.00 is the passing grade
				.reduce((sum, course) => sum + course.credits, 0);

			const weightedSum = courses.reduce((sum, course) => sum + (course.grade * course.credits), 0);
			const averageGrade = weightedSum / totalCreditsAttempted;

			allCoursesBySemester.push({
				semester: option.text.trim().replace(/\s-\sTripoli$/, ""),
				courses: courses,
				scheduleLink: scheduleLink,
				totalCreditsAttempted: totalCreditsAttempted,
				totalCreditsPassed: totalCreditsPassed,
				averageGrade: parseFloat(averageGrade.toFixed(2)), // Rounded to 2 decimal places
			});
		}

		return allCoursesBySemester;
	} catch (error) {
		console.error("Error in scrapeCourses:", error);
		throw error;
	}
};

module.exports = {
	scrapeCourses,
};
