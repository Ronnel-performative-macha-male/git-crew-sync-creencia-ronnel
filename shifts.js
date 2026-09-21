const OVERTIME_THRESHOLD = 8;
const OVERTIME_MULTIPLIER = 1.5;

function isValidShift(hours) {
  return hours > 0 && hours <= 24;
}

function calculatePay(hours, rate) {
  const regularHours = Math.min(hours, OVERTIME_THRESHOLD);
  const overtimeHours = Math.max(hours - OVERTIME_THRESHOLD, 0);
  return Math.round(regularHours * rate + overtimeHours * rate * OVERTIME_MULTIPLIER);
}

module.exports = { isValidShift, calculatePay };