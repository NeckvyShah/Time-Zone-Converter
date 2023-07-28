const inquirer = require("inquirer");

// TimeZOne options
const timeZones = [
  "Africa/Abidjan",
  "Africa/Accra",
  "Africa/Addis_Ababa",
  "America/Chicago",
  "America/Costa_Rica",
  "America/Jamaica",
  "America/New_York",
  "America/Toronto",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Hong_Kong",
  "Asia/Kathmandu",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Canada/Pacific",
  "Europe/Budapest",
  "Europe/Minsk",
  "Europe/London",
  "Europe/Vatican",
  "Pacific/Auckland",
  "Pacific/Chatham",
  "US/Alaska",
];

// Function to convert TIMEZONE
function convertTimeZone(time, fromTimeZone, toTimeZone) {
  //   const date = new Date(time);
  //   const options = {
  //     year: 'numeric',
  //     month: 'numeric',
  //     day: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //     timeZone: toTimeZone,
  //   };
  //   const convertedTime = date.toLocaleString('en-US', options);
  //   return convertedTime;

  const [timeStr, period] = time.split(" ");
  const [hours, minutes] = timeStr.split(":");

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, //time will be displayed in 12 hour format suing am and pm indicators
    timeZone: toTimeZone,
  };

  const convertedTime = new Date().toLocaleString("en-US", options);

  return convertedTime;
}

// Using inquirer to promt users for input
inquirer
  .prompt([
    {
      type: "input",
      name: "time",
      message: "Enter the time in (HH:MM AM/PM) format:",
      validate: (input) => {
        const pattern = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/;
        return pattern.test(input)
          ? true
          : "Please enter a valid time in HH:MM AM/PM format.";
      },
    },
    {
      type: "list",
      name: "fromTimeZone",
      message: "Select the timeZone you are currently in:",
      choices: timeZones,
    },
    {
      type: "list",
      name: "toTimeZone",
      message: "Select the timeZone you are want to convert to:",
      choices: timeZones,
    },
  ])
  .then((answers) => {
    const { time, fromTimeZone, toTimeZone } = answers;
    const convertedTime = convertTimeZone(time, fromTimeZone, toTimeZone);
    console.log(`Converted time: ${convertedTime}`);
  })
  .catch((error) => {
    console.log(error);
  });
