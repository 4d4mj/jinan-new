const scrapeCourses = async (page) => {
	try {
		const options = await page.evaluate(() => {
			const selectElement = document.querySelector(
				'select[name="semId"]'
			);
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
					const credits = parseFloat(
						row
							.querySelector(":nth-child(5)")
							.textContent.split(".")[0]
					);
					let type = row.querySelector(":nth-child(6)").textContent;
					if (type === "GERElective") {
						type = "Elective";
					} else if (type === "GER") {
						type = "General";
					}
					const grade = parseFloat(
						row.querySelector(":nth-child(7)").textContent
					);
					return { code, name, credits, type, grade };
				});
			});
			/*
			// Extract details for each course
			let i = 0; // Index for rows
			for (const course of courses) {
				// Click the 'Submit' button to get details for each course
				await page.click(
					`tr.admintable_light:nth-child(${i + 5}) input[value="D"]`
				);
				await page.waitForSelector(".table_main");

				// Extract the section for the current course
				const courseDetails = await page.evaluate(() => {
					const detailstable =
						document.querySelectorAll(".table_main")[2];
					const detailRows =
						detailstable.querySelector(".admintable_light");

					const section =
						detailRows.querySelector(":nth-child(3)").textContent;
					const instructor =
						detailRows.querySelector(":nth-child(4)").textContent;
					const room =
						detailRows.querySelector(":nth-child(5)").textContent;

					// Extract the schedule and replace <br> with bullet characters
					const scheduleElement =
						detailRows.querySelector(":nth-child(6)");
					const scheduleItems = Array.from(scheduleElement.childNodes)
						.map((node) => {
							if (node.nodeType === Node.TEXT_NODE) {
								return node.textContent.trim(); // Get text directly
							} else if (
								node.nodeType === Node.ELEMENT_NODE &&
								node.nodeName === "BR"
							) {
								return " ● "; // Replace <br> with a bullet character
							}
							return "";
						})
						.filter((item) => item) // Remove empty strings
						.join(""); // Join the items into a single string

					return {
						section,
						instructor,
						room,
						schedule: scheduleItems,
					};
				});

				// Assign the details to the current course
				course.section = courseDetails.section;
				course.instructor = courseDetails.instructor;
				course.room = courseDetails.room;
				course.schedule = courseDetails.schedule;

				// Go back to the course list
				await page.goBack();
				await page.waitForSelector(".table_main");
				i++;
			}

			// Extract folder for each course
			i = 0; // Index for rows
			for (const course of courses) {
				// Click the 'Submit' button to get details for each course
				await page.click(
					`tr.admintable_light:nth-child(${i + 5}) input[value="F"]`
				);
				await page.waitForSelector(".table_main");

				// Extract the materials for the current course
				const courseFolder = await page.evaluate(() => {
					const detailstable =
						document.querySelectorAll(".table_main")[2];
					const detailRows =
						detailstable.querySelectorAll(".admintable_light");

					const materials = []; // Array to hold all materials for the course

					detailRows.forEach((detailRow) => {
						const download =
							detailRow.querySelector(":nth-child(2) a"); // Adjusting to select <a> tag inside
						let downloadlink = download
							? download.getAttribute("href")
							: null;
						if (
							downloadlink &&
							!downloadlink.startsWith("https://")
						) {
							downloadlink =
								"https://jinansystem.com/student/" +
								downloadlink;
						}

						// Ensure to check if these elements exist before accessing their textContent
						const fileElement =
							detailRow.querySelector(":nth-child(3)");
						const descriptionElement =
							detailRow.querySelector(":nth-child(4)");
						const dateElement =
							detailRow.querySelector(":nth-child(5)");

						const file = fileElement
							? fileElement.textContent
							: null;
						const description = descriptionElement
							? descriptionElement.textContent
							: null;
						const date = dateElement
							? dateElement.textContent
							: null;

						// Push the extracted material object into the materials array
						if (file) {
							materials.push({
								downloadlink,
								file,
								description,
								date,
							});
						}
					});

					return materials; // Return the array of materials
				});

				// Assign the materials to the course's folder
				course.folder = courseFolder;

				// Go back to the course list for the next iteration
				await page.goBack();
				await page.waitForSelector(".table_main");
				i++;
			}

			// Extract homework for each course
			i = 0; // Index for rows
			for (const course of courses) {
				// Click the 'Submit' button to get details for each course
				await page.click(
					`tr.admintable_light:nth-child(${i + 5}) input[value="H"]`
				);
				await page.waitForSelector(".table_main");

				// Extract the homeworks for the current course
				const courseHomework = await page.evaluate(() => {
					const detailstable =
						document.querySelectorAll(".table_main")[2];
					const detailRows =
						detailstable.querySelectorAll(".admintable_light");

					const homeworks = []; // Array to hold all materials for the course

					detailRows.forEach((detailRow) => {
						// Ensure to check if these elements exist before accessing their textContent
						const titleElement =
							detailRow.querySelector("td:nth-child(2)");
						const descriptionElement =
							detailRow.querySelector(":nth-child(3)");
						const deadlineElement =
							detailRow.querySelector(":nth-child(4)");

						const title = titleElement
							? titleElement.textContent
									.replace(/\u00A0/g, " ")
									.trim()
							: null;
						const description = descriptionElement
							? descriptionElement.textContent
							: null;
						const deadline = deadlineElement
							? deadlineElement.textContent
							: null;

						// Push the extracted material object into the materials array
						if (title) {
							homeworks.push({
								// downloadlink,
								title,
								description,
								deadline,
							});
						}
					});

					return homeworks; // Return the array of materials
				});

				// Assign the materials to the course's folder
				course.homework = courseHomework;

				// Go back to the course list for the next iteration
				await page.goBack();
				await page.waitForSelector(".table_main");
				i++;
			}

			// Extract grades for each course
			i = 0; // Index for rows
			for (const course of courses) {
				// Click the 'Submit' button to get details for each course
				await page.click(
					`tr.admintable_light:nth-child(${i + 5}) input[value="G"]`
				);
				await page.waitForSelector(".table_main");

				// Extract the homeworks for the current course
				const courseGrades = await page.evaluate(() => {
					const detailstable =
						document.querySelectorAll(".table_main")[2];
					const detailRows =
						detailstable.querySelectorAll(".admintable_light");

					const grades = []; // Array to hold all materials for the course

					detailRows.forEach((detailRow) => {
						// Ensure to check if these elements exist before accessing their textContent
						const titleElement =
							detailRow.querySelector("td:nth-child(2)");
						const dateElement =
							detailRow.querySelector("td:nth-child(3)");
						const percentageElement =
							detailRow.querySelector("td:nth-child(4)");
						const gradeElement =
							detailRow.querySelector("td:nth-child(5)");

						const title = titleElement
							? titleElement.textContent
									.replace(/\u00A0/g, " ")
									.trim()
							: null;
						const date = dateElement
							? dateElement.textContent
							: null;
						const percentage = percentageElement
							? parseInt(
									percentageElement.textContent.replace(
										".00%",
										""
									)
							  )
							: null;
						const grade = gradeElement
							? gradeElement.textContent
							: null;

						// Push the extracted material object into the materials array
						if (title) {
							grades.push({
								title,
								percentage,
								date,
								grade,
							});
						}
					});

					// Select the before-last and last rows
					const beforeLastRow = detailstable.querySelector(
						"tr:nth-last-child(2)"
					);
					const lastRow = detailstable.querySelector("tr:last-child");

					let total = null;
					let letter = null;

					// Check if both rows have exactly 2 children before extracting data
					if (beforeLastRow && beforeLastRow.children.length == 2) {
						const totalElement =
							beforeLastRow.querySelector("td:nth-child(2)");
						total = totalElement
							? totalElement.textContent.trim()
							: null;
					}

					if (lastRow && lastRow.children.length == 2) {
						const letterElement =
							lastRow.querySelector("td:nth-child(2)");
						letter = letterElement
							? letterElement.textContent.trim()
							: null;
					}

					return { grades, total, letter }; // Return the grades along with total and letter
				});

				// Sort the grades by percentage
				const sortedGrades = courseGrades.grades.sort(
					(a, b) => a.percentage - b.percentage
				); // Sort ascending by percentage

				// Convert each percentage back to a string and add '%' at the end
				sortedGrades.forEach((grade) => {
					if (grade.percentage !== null) {
						grade.percentage = `(${grade.percentage}%)`;
					}
				});

				// Add the total and letter grade back at the end if they exist
				if (courseGrades.total && courseGrades.letter) {
					course.total = courseGrades.total;
					course.letter = courseGrades.letter;
				}

				// Assign the sorted materials to the course's folder
				course.grades = sortedGrades;

				// Go back to the course list for the next iteration
				await page.goBack();
				await page.waitForSelector(".table_main");
				i++;
			}
				*/
			const scheduleLink = await page.evaluate(() => {
				const linkElement = document.querySelector(
					'a[href*="printSchedule"]'
				);
				return linkElement ? linkElement.href : null;
			});

			// Calculate totals for credits and average grade
			const totalCreditsAttempted = courses
				.reduce((sum, course) => sum + course.credits, 0)
				.toString();
			const totalCreditsPassed = courses
				.filter((course) => course.grade >= 2.0) // Assuming 2.00 is the passing grade
				.reduce((sum, course) => sum + course.credits, 0);

			const weightedSum = courses.reduce(
				(sum, course) => sum + course.grade * course.credits,
				0
			);
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
