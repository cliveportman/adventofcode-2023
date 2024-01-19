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
  coords: [number, number][];
}[];
const asteriskCoords: [number, number][] = [];

const numbers: characterCoords = [];

lines.forEach((line, yIndex) => {
  const characters = line.split("");

  let numberString = "";
  characters.forEach((char, xIndex) => {
    // If the character is not a numeric value or a dot., then it is a special character

    if (isNaN(Number(char)) && char !== ".") {
      if (char === "*") asteriskCoords.push([xIndex, yIndex]);

      if (numberString !== "") {
        const coords: [number, number][] = [];
        for (let i = xIndex - numberString.length; i < xIndex; i++) {
          coords.push([i, yIndex]);
        }
        numbers.push({
          num: numberString,
          coords: coords,
        });
      }
      numberString = "";
    } else if (!isNaN(Number(char))) {
      numberString += char;
      // Need to cover line end being a number here
      if (xIndex === characters.length - 1) {
        const coords: [number, number][] = [];
        for (let i = xIndex - numberString.length + 1; i < xIndex; i++) {
          coords.push([i, yIndex]);
        }
        numbers.push({
          num: numberString,
          coords: coords,
        });
      }
    } else {
      if (numberString !== "") {
        const coords: [number, number][] = [];
        for (let i = xIndex - numberString.length; i < xIndex; i++) {
          coords.push([i, yIndex]);
        }
        numbers.push({
          num: numberString,
          coords: coords,
        });
      }
      numberString = "";
    }
  });
});

let gearPairs: number[][] = [];
let gearRatios: number[] = [];
asteriskCoords.forEach((asterisk) => {
  const edges = [
    [asterisk[0] - 1, asterisk[1] - 1], // top-left
    [asterisk[0], asterisk[1] - 1], // top-middle
    [asterisk[0] + 1, asterisk[1] - 1], // top-right
    [asterisk[0] - 1, asterisk[1]], // middle-left
    [asterisk[0] + 1, asterisk[1]], // middle-right
    [asterisk[0] - 1, asterisk[1] + 1], // bottom-left
    [asterisk[0], asterisk[1] + 1], // bottom-middle
    [asterisk[0] + 1, asterisk[1] + 1], // bottom-right
  ];
  //console.log(edges);

  const collidingNumbers = numbers.filter((object) => {
    const collision = object.coords.some((coord) => {
      const edgeCollision = edges.some((edge) => {
        if (edge[0] === coord[0] && edge[1] === coord[1]) return true;
      });
      if (edgeCollision) return true;
    });
    if (collision) return true;
  });
  console.log(collidingNumbers);
  if (collidingNumbers.length === 2) {
    const pair = collidingNumbers.map((n) => Number(n.num));
    gearPairs.push(pair);
    const gearRatio =
      Number(collidingNumbers[0].num) * Number(collidingNumbers[1].num);
    gearRatios.push(gearRatio);
  }
});
// console.log(numbers.find((n) => n.num === "714"));
// console.log(numbers.find((n) => n.num === "595"));
// console.log(asteriskCoords);
//console.log(gearRatios);
// writeFileSync("./src/day3/log.txt", gearPairs.join("\n"));

const answer = gearRatios.reduce((a, b) => a + b);

console.log(answer);
console.timeEnd("advent2a");
