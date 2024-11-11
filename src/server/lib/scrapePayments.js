const scrapePayments = async (page) => {
	try {
		await page.click(
			'a[href="https://jinansystem.com/student/MyPayments/index.php"]'
		);
		await page.waitForSelector("#AutoNumber2");

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

		const allPayments = [];

		for (const option of options) {
			await page.selectOption('select[name="semId"]', option.value);
			await page.waitForSelector(".table_main");

			const payments = await page.evaluate(() => {
				const table = document.querySelector("#AutoNumber3");
				const rows = table.querySelectorAll("tr.admintable_last");

				return Array.from(rows).map((row) => {
					const bank_no =
						row
							.querySelector(":nth-child(2)")
							?.textContent.trim() || "";
					const amount =
						row
							.querySelector(":nth-child(3)")
							?.textContent.trim() || "";
					const date =
						row
							.querySelector(":nth-child(4)")
							?.textContent.trim() || "";
					const due =
						row
							.querySelector(":nth-child(5)")
							?.textContent.trim() || "";
					const status =
						row
							.querySelector(":nth-child(6)")
							?.textContent.trim() || "";
					const link = row.querySelector("a")?.href || "";
					return { bank_no, amount, date, due, status, link };
				});
			});

			const details = await page.evaluate(() => {
				const table = document.querySelector("#AutoNumber3");
				const detailsTable = table
					? table.previousElementSibling
					: null;
				const manualTable = detailsTable?.querySelector("table");
				const detailsRows = detailsTable?.querySelectorAll(
					":scope > tbody > tr"
				);
				const manualRows = manualTable?.querySelectorAll("tr");

				const account =
					Array.from(detailsRows).slice(1).flatMap((row, index) => {
						const cells = row.querySelectorAll("td");

						// Handle special rows
						if (index === 21) {
							const singleEntry = {
								title: cells[1].textContent.trim(),
								amount: cells[2].textContent.trim(),
							};
							return [singleEntry];
						}

						// Handle rows with two pairs of title and amount
						if (cells.length === 4) {
							const firstEntry = {
								title: cells[0].textContent.trim(),
								amount: cells[1].textContent.trim(),
							};
							const secondEntry = {
								title: cells[2].textContent.trim(),
								amount: cells[3].textContent.trim(),
							};
							return [firstEntry, secondEntry]; // Return an array with two objects
						}
						// Handle rows with one title and amount
						else if (cells.length === 2 || index === 2) {
							const singleEntry = {
								title: cells[0].textContent.trim(),
								amount: cells[1].textContent.trim(),
							};
							return [singleEntry]; // Return an array with a single object
						}
						// Skip rows that don't match expected formats
						else {
							return [];
						}
					});

					const manual = Array.from(manualRows)
					.flatMap((row) => {
						const cells = row.querySelectorAll("td");
						if (cells.length === 2) {
							const title = cells[0].textContent.trim();
							const amount = cells[1].textContent.trim();
							return [{ title, amount }]; // Return as an array to be flattened
						}
						return []; // Return an empty array to skip this row
					});

				return { account, manual };
			});

			const courses = await page.evaluate(() => {
				const table = document.querySelector("#AutoNumber3");
				const detailsTable =
					table?.previousElementSibling?.previousElementSibling
						?.previousElementSibling || null;
				const rows = detailsTable.querySelectorAll(
					"tr.admintable_light"
				);

				return Array.from(rows).map((row) => {
					const elementText = row
						.querySelector(":nth-child(2)")
						.textContent.trim();
					const [code, ...nameParts] = elementText.split(" ");
					const name = nameParts.join(" ");

					const credits = parseFloat(
						row
							.querySelector(":nth-child(5)")
							.textContent.split(".")[0]
					);
					let fee = row.querySelector(":nth-child(6)").textContent;
					let aid = row.querySelector(":nth-child(7)").textContent.split(".")[0] + "%";
					let net_fee = row.querySelector(":nth-child(8)").textContent;
					return { code, name, credits, fee, aid, net_fee };
				});
			});

			allPayments.push({
				semester: option.text.trim().replace(/\s-\sTripoli$/, ""),
				courses: courses,
				payments: payments,
				details: details,
			});
		}
		return allPayments;
	} catch (error) {
		console.error("Error in scrapePayments:", error);
		throw error;
	}
};

module.exports = {
	scrapePayments,
};
