// Read a text file
import { readFileSync } from "fs";

console.time("advent2a");

// read the input file, with error handling
let input = "";
try {
  input = readFileSync("./src/day3/test.txt", "utf8");
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

type CharacterCoord = {
  start: [number, number];
  end: [number, number];
};

const characterCoords: {
  [key: string]: CharacterCoord[];
}[] = [];
const specialCoords: [number, number][] = [];

const numbers: string[] = [];

lines.forEach((line, yIndex) => {
  const characters = line.split("");

  let numberString = "";
  characters.forEach((char, xIndex) => {
    // If the character is not a numeric value or a dot., then it is a special character
    if (isNaN(Number(char)) && char !== ".") {
      specialCoords.push([xIndex, yIndex]);
      if (numberString !== "") {
        numbers.push(numberString);
      }
      numberString = "";
    } else if (!isNaN(Number(char))) {
      console.log(char);
      numberString += char;
      console.log(numberString);
    } else {
      if (numberString !== "") {
        numbers.push(numberString);
      }
      numberString = "";
    }
  });
});
console.log(specialCoords);
console.log(numbers);

// console.log(answer);
console.timeEnd("advent2a");
