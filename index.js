const form = document.getElementById('dob-form');
import { calculateAge } from './ageCalculator.js';

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Input fields
  const day = document.getElementById('date');
  const month = document.getElementById('month');
  const year = document.getElementById('year');

  // Display Fields
  const calculatedYears = document.getElementById("yyyy");
  const calculatedMonths = document.getElementById("mm");
  const calculatedDays = document.getElementById("dd");

  const isEmpty = (DD, MM, YYYY) => {
    let isFieldEmpty = false;
    [DD, MM, YYYY].forEach((ele) => {
      if (ele.value === "") {
        ele.previousElementSibling.classList.replace("text-[color:var(--smokeyGrey)]", "text-[color:var(--lightRed)]")
        ele.nextElementSibling.innerHTML = "This field is required"
        ele.nextElementSibling.style = "display:block";
        ele.classList.add("border-[color:var(--lightRed)]")
        isFieldEmpty = true;
      } else {
        ele.nextElementSibling.style = "display:none";
        ele.previousElementSibling.classList.replace("text-[color:var(--lightRed)]", "text-[color:var(--smokeyGrey)]")
        ele.classList.remove("border-[color:var(--lightRed)]")
      }
    });
    return isFieldEmpty;
  }

  const isDateInRange = (DD, MM, YYYY) => {
    let currentDate = new Date();
    let inputDate = new Date(`${YYYY}-${MM}-${DD}`);
    let isInRange = true;
    if (DD < 1 || DD > 31) {
      day.previousElementSibling.classList.replace("text-[color:var(--smokeyGrey)]", "text-[color:var(--lightRed)]")
      day.nextElementSibling.innerHTML = "Must be a valid day"
      day.nextElementSibling.style = "display:block";
      day.classList.add("border-[color:var(--lightRed)]");
      isInRange = false;
    } else {
      day.classList.remove("border-[color:var(--lightRed)]")
    }

    if (MM < 1 || MM > 12) {
      month.previousElementSibling.classList.replace("text-[color:var(--smokeyGrey)]", "text-[color:var(--lightRed)]")
      month.nextElementSibling.innerHTML = "Must be a valid month"
      month.nextElementSibling.style = "display:block";
      month.classList.add("border-[color:var(--lightRed)]");
      isInRange = false;
    } else {
      month.classList.remove("border-[color:var(--lightRed)]")
    }

    if (YYYY > currentDate.getFullYear()) {
      year.previousElementSibling.classList.replace("text-[color:var(--smokeyGrey)]", "text-[color:var(--lightRed)]")
      year.nextElementSibling.innerHTML = "Must be in the past"
      year.nextElementSibling.style = "display:block";
      year.classList.add("border-[color:var(--lightRed)]");
      isInRange = false;
    } else {
      year.classList.remove("border-[color:var(--lightRed)]")
    }
    return isInRange;
  }

  const isValid = (DD, MM, YYYY) => {
    const inputDate = `${YYYY}-${MM}-${DD}`;
    const date = new Date(inputDate);

    // Check if the input is a valid date
    if (
      isNaN(date.getTime()) ||  // Invalid date
      date.toISOString().slice(0, 10) !== inputDate  // Input was modified by the Date constructor
    ) {
      [day, month, year].forEach((ele) => {
        ele.previousElementSibling.classList.replace("text-[color:var(--smokeyGrey)]", "text-[color:var(--lightRed)]")
        ele.classList.add("border-[color:var(--lightRed)]")
      });
      day.nextElementSibling.style = "display:block";
      day.nextElementSibling.innerHTML = "Must be a valid date"
      return false;
    }
    [day, month, year].forEach(ele => {
      ele.nextElementSibling.style = "display:none";
      ele.previousElementSibling.classList.replace("text-[color:var(--lightRed)]", "text-[color:var(--smokeyGrey)]")
      ele.classList.remove("border-[color:var(--lightRed)]")
    })
    return true;
  }

  if (!isEmpty(day, month, year) && (isDateInRange(day.value, month.value, year.value))
    && (isValid(day.value, month.value, year.value))) {
    const { years, months, days } = calculateAge(`${year.value}-${month.value}-${day.value}`)
    calculatedYears.innerHTML = years;
    calculatedMonths.innerHTML = months;
    calculatedDays.innerHTML = days;
  } else {
    calculatedYears.innerHTML = "--";
    calculatedMonths.innerHTML = "--";
    calculatedDays.innerHTML = "--";
  }
})