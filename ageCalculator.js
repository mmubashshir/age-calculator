export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  
  let years = currentDate.getFullYear() - dob.getFullYear();
  let months = currentDate.getMonth() - dob.getMonth();
  let days = currentDate.getDate() - dob.getDate();
  
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  
  if (days < 0) {
    const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    days += daysInPreviousMonth;
    months--;
  }
  
  return { years, months, days };
}
