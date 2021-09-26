const submitButton = document.querySelector("#submit-btn");
const input = document.querySelector("#date");
const output = document.querySelector("#output");
submitButton.addEventListener("click", buttomHandler);

function buttomHandler() {
  var bdayDate = input.value;

  if (isEmpty(bdayDate)) {
    output.innerText = "Please enter a date!";
    return;
  }

  var listOfDate = bdayDate.split("-");

  var date = {
    day: Number(listOfDate[2]),
    month: Number(listOfDate[1]),
    year: Number(listOfDate[0]),
  };

  if (checkPalindromeForAllDateFormats(date)) {
    output.innerText = "Your Birthday is a Palindrome!!🥳🥳";
  } else {
    var [daysAway, nextDate] = getNextPalindromeDate(date);
    var daysString = daysAway > 1 ? "days" : day;
    var formattedDate =
      nextDate.day + "-" + nextDate.month + "-" + nextDate.year;
    output.innerText = `Oops! Your Birthday is Not a Palindrome!😔 \n The next palindrome date is ${formattedDate}\n You missed it by ${daysAway} ${daysString}`;
  }
}

function isEmpty(date) {
  return date === "";
}
function reverseString(str) {
  //split
  var chars = str.split("");
  //reverse
  var reversedChars = chars.reverse();
  //join back
  var reversedStr = reversedChars.join("");

  return reversedStr;
}

function isPalindrome(str) {
  var reversedStr = reverseString(str);
  return str === reversedStr;
}

function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToString(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);
  var isAPalindrome = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      isAPalindrome = true;
      break;
    }
  }

  return isAPalindrome;
}

function isLeapYear(year) {
  if (year % 400) {
    return true;
  }
  if (year % 100) {
    return false;
  }
  if (year % 4) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  } else {
    //spillover into next month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counter++;
    if (checkPalindromeForAllDateFormats(nextDate)) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];
}

/* Testing
var date = {
  day: 11,
  month: 2,
  year: 2020,
};

console.log(getNextPalindromeDate(date));
*/
