// scheduleFormatter.js

function formatSchedule(schedule) {
	// Extract the day and time using a regex
	const regex = /(\w+)\((\d{2}:\d{2}:\d{2})-(\d{2}:\d{2}:\d{2})\)/;
	const match = schedule.match(regex);

	if (!match) {
		 throw new Error("Invalid schedule format");
	}

	const day = match[1]; // e.g., "Monday"
	const startTime = match[2]; // e.g., "10:05:00"
	const endTime = match[3]; // e.g., "12:00:00"

	// Map full day names to single letters
	const dayMap = {
		 "Monday": "M",
		 "Tuesday": "T",
		 "Wednesday": "W",
		 "Thursday": "Th",
		 "Friday": "F",
		 "Saturday": "S",
		 "Sunday": "Su"
	};

	// Convert time from 24-hour to 12-hour format
	const formatTime = (time) => {
		 const [hour, minute] = time.split(':').map(Number);
		 const ampm = hour >= 12 ? 'PM' : 'AM';
		 const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
		 return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
	};

	// Get abbreviated day and formatted times
	const abbreviatedDay = dayMap[day] || day; // Fallback to full name if not found
	const formattedStartTime = formatTime(startTime);
	const formattedEndTime = formatTime(endTime);

	// Construct the final output
	return `${abbreviatedDay} (${formattedStartTime} - ${formattedEndTime})`;
}

// Export the function
module.exports = formatSchedule;
