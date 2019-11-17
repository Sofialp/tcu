export const calculateDayOfWeek = dayIndex => {
  let dayOfWeekId = dayIndex;
  if (dayIndex === 0) {
    dayOfWeekId = 7;
  }
  return dayOfWeekId;
};

export const getHoursAvailable = hoursGroup => {
  const startHour = parseInt(hoursGroup.startHour.substring(0, 3), 10);
  const endHour = parseInt(hoursGroup.endHour.substring(0, 3), 10);
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    hours.push(i);
  }
  return hours;
};

export const convertHourToNumber = hour => {
  const [res] = hour.split(':', 2);
  return parseInt(res, 10);
};

export const verifyContinuesHour = (hour, selectedHours) => {
  if (selectedHours.length === 0) return true;
  let isValid = false;
  selectedHours.forEach(item => {
    const difference = item - hour;
    if (difference === 1 || difference === -1) {
      isValid = true;
    }
  });
  return isValid;
};

export const setOptionStructureForTableDropdown = items => {
  const options = {};
  items.forEach(item => {
    options[item.id] = item.name;
  });
  return options;
};

export const filterArrays = (array1, array2) => {
  return array1.filter(function(item) {
    return !array2.includes(item);
  });
};
