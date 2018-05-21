/* eslint-disable no-console */
const amPmMatcher = /^(\d{2}:\d{2})([ap])?(m)?$/i;
const inactiveMatcher = /^\d{2}:\d{2}:(\d{2})$/;
const l5Marcher = /^(\d{2}:\d{2})$/;
const testMatcher = /^(\d{2}:)$/;
const normalizeTime = (value /* , previousValue */) => {
  if (!value) {
    return value;
  }
  let newValue = (value[0] === ' ') ? `0${value.slice(1)}` : `${value}`;
  const l5Match = newValue.match(l5Marcher);
  if (l5Match && l5Match[1]) {
    // if (value[0] === '0') {
    //   const newValue = ` ${value.slice(1)}`;
    //   return newValue;
    // }
    return value;
  }
  const testFUMatch = newValue.match(testMatcher);
  if (testFUMatch && testFUMatch[1]) {
    console.log('bug');
  }
  let lowerCaseValue = newValue;
  const testMatch = newValue.match(amPmMatcher);
  if (testMatch && testMatch[1]) {
    lowerCaseValue = newValue.toLowerCase();
  }

  const groups = lowerCaseValue.match(amPmMatcher);
  if (groups && groups.length > 1) {
    const match = `${groups[2] !== undefined ? groups[2] : 'x'}${groups[3] !== undefined ? groups[3] : 'y'}`;
    switch (match) {
      case 'am':
      case 'pm':
        return newValue.slice(0, 7);
      case 'ay':
      case 'py':
        // makes it impossible to edit 'a' or 'p'
        // return `${value.slice(0, 6)}${lowerCaseValue === value ? 'm' : 'M'}`;
        return newValue.slice(0, 6);
      case 'xm':
        return newValue.slice(0, 5);
      default:
    }
  }
  const inactiveGroup = value.match(inactiveMatcher);

  if (inactiveGroup && inactiveGroup[1]) {
    // console.log(`typeof value ${typeof value}`);
    newValue = value.slice(0, 5);
    if (newValue[0] === '0') {
      newValue = ` ${newValue.slice(1)}`; // only replace leading 0 with space on refresh
    }
    return newValue;
  } else if (value[0] === ' ') {
    newValue = `0${value.slice(1)}`;
  } else {
    newValue = `${value}`;
  }
  const onlyNums = newValue.replace(/[^\d]/g, '');
  // if (!previousValue || value.length > previousValue.length) {
  //   // typing forward
  //   if (onlyNums.length === 2) {
  //     return `${onlyNums}:`;
  //   }
  // }
  if (onlyNums.length <= 3) {
    return value;
  }
  // if (onlyNums.length === 3) {
  //   onlyNums = `0${onlyNums}`;
  // }
  // if (onlyNums[0] === '0') onlyNums = ` ${onlyNums.slice(1)}`;
  return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 4)}`;
};
export default normalizeTime;
/**
 * Force after min date
 */
// const timeNormalize = (value, previousValue, values) => {
//   const momentTime = moment(values.time, 'HH:MM', true);
//   if (!momentTime.isValid()) {
//     return value;
//   }
//   if (!momentMaxDate.isAfter(momentMinDate)) {
//     return momentMinDate.add(1, 'd').format('MM-DD-YYYY');
//   }
//   return value;
// };

// /**
//  * Force before max date
//  */
// const minDateNormalize = (value, previousValue, values) => {
//   const momentMaxDate = moment(values.maxDate, 'MM-DD-YYYY', true);
//   const momentMinDate = moment(value, 'MM-DD-YYYY', true);
//   if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
//     return value;
//   }
//   if (!momentMinDate.isBefore(momentMaxDate)) {
//     return momentMaxDate.subtract(1, 'd').format('MM-DD-YYYY');
//   }
//   return value;
// };
