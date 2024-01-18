// Read a text file
import { readFileSync, writeFileSync } from "fs";

console.time("advent2a");

// read the input file, with error handling
let input = "";
try {
  input = readFileSync("./src/day3/input.txt", "utf8");
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

type characterCoords = {
  num: string;
  start: [number, number];
  end: [number, number];
}[];
const specialCoords: [number, number][] = [];

const numbers: characterCoords = [];

lines.forEach((line, yIndex) => {
  const characters = line.split("");

  let numberString = "";
  characters.forEach((char, xIndex) => {
    // If the character is not a numeric value or a dot., then it is a special character
    if (isNaN(Number(char)) && char !== ".") {
      specialCoords.push([xIndex, yIndex]);
      if (numberString !== "") {
        numbers.push({
          num: numberString,
          start: [xIndex - numberString.length, yIndex],
          end: [xIndex - 1, yIndex],
        });
      }
      numberString = "";
    } else if (!isNaN(Number(char))) {
      numberString += char;
      // Need to cover line end being a number here
      if (xIndex === characters.length - 1) {
        numbers.push({
          num: numberString,
          start: [xIndex - numberString.length + 1, yIndex],
          end: [xIndex, yIndex],
        });
      }
    } else {
      if (numberString !== "") {
        numbers.push({
          num: numberString,
          start: [xIndex - numberString.length, yIndex],
          end: [xIndex - 1, yIndex],
        });
      }
      numberString = "";
    }
  });
});
// console.log(specialCoords);
// console.log(numbers);

const collisions = numbers.filter((object) => {
  // remember the start and end are arrays of [x, y]
  const startEdges = [
    [object.start[0] - 1, object.start[1] - 1], // top-left
    [object.start[0], object.start[1] - 1], // top-middle
    [object.start[0] + 1, object.start[1] - 1], // top-right
    [object.start[0] - 1, object.start[1]], // middle-left
    [object.start[0] - 1, object.start[1] + 1], // bottom-left
    [object.start[0], object.start[1] + 1], // bottom-middle
    [object.start[0] + 1, object.start[1] + 1], // bottom-right
  ];
  const endEdges = [
    [object.end[0] - 1, object.end[1] - 1], // top-left
    [object.end[0], object.end[1] - 1], // top-middle
    [object.end[0] + 1, object.end[1] - 1], // top-right
    [object.end[0] + 1, object.end[1]], // middle-right
    [object.end[0] - 1, object.end[1] + 1], // bottom-left
    [object.end[0], object.end[1] + 1], // bottom-middle
    [object.end[0] + 1, object.end[1] + 1], // bottom-right
  ];
  const collision = specialCoords.some((special) => {
    // does the start or end of the line intersect with a special character?
    const startCollision = startEdges.some(
      (edge) => edge[0] === special[0] && edge[1] === special[1]
    );
    const endCollision = endEdges.some(
      (edge) => edge[0] === special[0] && edge[1] === special[1]
    );
    if (startCollision || endCollision) return true;
  });
  if (collision) return true;
  return false;
});
//console.log(collisions);
// writeFileSync(
//   "./src/day3/log.txt",
//   collisions.map((object) => Number(object.num)).join("\n")
// );
const numbersWithCollisions = collisions.map((object) => Number(object.num));

const answer = numbersWithCollisions.reduce((a, b) => a + b);

console.log(answer);
console.timeEnd("advent2a");
