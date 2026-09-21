const shifts = require('./shifts');

let failures = 0;
function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    console.error(`FAIL: ${label} — expected ${expected}, got ${actual}`);
    failures++;
  } else {
    console.log(`PASS: ${label}`);
  }
}

assertEqual(shifts.isValidShift(8), true, 'a normal shift is valid');
assertEqual(shifts.isValidShift(0), false, 'a zero-hour shift is invalid');
assertEqual(shifts.isValidShift(30), false, 'a shift over 24 hours is invalid');

const pay = shifts.calculatePay(6, 20.33);
assertEqual(pay, 121, 'pay for a 6-hour shift at $20.33/hr');

const overtimePay = shifts.calculatePay(10, 20);
assertEqual(overtimePay, 220, 'pay for a 10-hour shift at $20/hr (2 overtime hours at 1.5x)');

process.exitCode = failures > 0 ? 1 : 0;