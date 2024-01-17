// Read a text file
import { readFileSync } from "fs";

console.time("advent1a");
const text = readFileSync("./src/day1/input.txt", "utf8");

// Split the text file into an array of strings
const lines = text.split("\n");

// For each line, strip out the non numbers
const numbers = lines.map((line) => {
  const digitString = line.replace(/\D/g, "");
  // convert string to an array of numbers
  const digits = digitString.split("");
  const a = parseInt(digits[0]);
  const b = parseInt(digits[digits.length - 1]);
  const numberString = `${a}${b}`;
  return parseInt(numberString);
});

// Add the numbers together
const sum = numbers.reduce((a, b) => a + b);

console.log(sum);
console.timeEnd("advent1a");
