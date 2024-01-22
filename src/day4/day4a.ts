// Read a text file
import { readFileSync, writeFileSync } from "fs";

console.time("advent4a");

// read the input file, with error handling
let input = "";
try {
  input = readFileSync("./src/day4/test.txt", "utf8");
} catch (err) {
  // the TS compiler will throw an error if trying to access err.message without checking the error's type first
  if (err instanceof Error) {
    console.error("Error", err.message);
  } else {
    console.error("An unknown error occurred");
  }
}

// split the text file into an array of strings, line by line
const lines = input.split("\r\n");

const scores = lines.map((line) => {
  // remove everything before the colon (sort out the double spaces)
  const numbers = line.replace(/  /g, " ").split(": ")[1];

  // split the cards into two arrays
  const [winningNumbersString, ownedNumbersString] = numbers.split(" | ");

  // convert to arrays of numbers
  const winningNumbers = winningNumbersString.split(" ").map(Number);
  const ownedNumbers = ownedNumbersString.split(" ").map(Number);

  // filter the owwned numbers array to only include numbers that are in the winning numbers array
  const matchingNumbers = ownedNumbers.filter((number) =>
    winningNumbers.includes(number)
  );
  // take the winning numbers array and return a resutlt that is the length of the array to the power of 2
  let result = 0;
  if (matchingNumbers.length > 0) {
    result = 1;
    for (let i = 2; i <= matchingNumbers.length; i++) {
      result *= 2;
    }
  }

  return result;
});
const answer = scores.reduce((a, b) => a + b, 0);
console.log("asnwer", answer);
