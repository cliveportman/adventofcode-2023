// Read a text file
import { readFileSync } from "fs";

console.time("advent2b");

// read the input file, with error handling
let input = "";
try {
  input = readFileSync("./src/day2/input.txt", "utf8");
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

const mins = lines.map((line) => {
  const pulls = line.split(":")[1].split(";");
  let red = 0;
  let green = 0;
  let blue = 0;
  pulls.forEach((pull) => {
    const redPull = pull.match(/(\d+) red/);
    if (redPull && Number(redPull[1]) > red) red = Number(redPull[1]);

    const greenPull = pull.match(/(\d+) green/);
    if (greenPull && Number(greenPull[1]) > green) green = Number(greenPull[1]);

    const bluePull = pull.match(/(\d+) blue/);
    if (bluePull && Number(bluePull[1]) > blue) blue = Number(bluePull[1]);
  });
  return [red, green, blue];
});

const powers = mins.map((min) => min.reduce((acc, value) => acc * value));
const answer = powers.reduce((acc, value) => acc + value);

console.log(mins);
console.log(powers);
console.log(answer);
console.timeEnd("advent2b");
