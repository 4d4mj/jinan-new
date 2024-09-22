const fetchProfile = async (cookies, context) => {
	const page = await context.newPage(); // Reuse the existing browser context

	try {
	  // Set session cookies before navigating
	  await context.addCookies(cookies);

	  // Navigate to the profile page
	  await page.goto('https://jinansystem.com/student/');

	  // Optionally, take a screenshot to verify the page
	  await page.screenshot({ path: 'profile_page.png' });

	  // Check if the session is still valid (if you're redirected to login page)
	  if (await page.$('input[name="USER"]')) {
		 throw new Error("Session expired");
	  }

	  // Scrape profile data
	  const profile = await page.evaluate(() => {
		 const tdElements = document.querySelectorAll('td.admintable_light div');
		 const semesterOptions = document.querySelectorAll('option');

		 if (!tdElements || tdElements.length === 0) {
			console.error('No td.admintable_light div elements found');
			return null;
		 }

		 if (!semesterOptions || semesterOptions.length === 0) {
			console.error('No option elements found');
			return null;
		 }

		 let semester = Array.from(semesterOptions)
			.map(option => option.textContent)
			.slice(1);

		 let major = tdElements[2]?.textContent || 'Unknown Major';

		 if (major === 'الفنون الإعلانية والتواصل البصري') {
			major = 'Graphic Design';
		 }

		 return {
			id: tdElements[0]?.textContent || 'Unknown ID',
			major: major,
			name: tdElements[3]?.textContent || 'Unknown Name',
			campus: tdElements[4]?.textContent || 'Unknown Campus',
			semester: semester,
		 };
	  });

	  return profile;
	} catch (error) {
	  console.error('Error in fetchProfile:', error);
	  throw error;
	} finally {
	  await page.close(); // Close the page after scraping
	}
 };

 module.exports = {
	fetchProfile,
 };
