// Read a text file
import { readFileSync } from "fs";

console.time("advent2");

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

const validGamesTotal = lines
  .filter((line) => {
    // create an array containing a game string and a pulls list string
    const strings = line.split(":");

    // split the pulls list string into an array of pulls
    const pulls = strings[1].split(";");

    const valid = pulls
      .map((pull) => {
        const red = pull.match(/(\d+) red/);
        const green = pull.match(/(\d+) green/);
        const blue = pull.match(/(\d+) blue/);

        return (
          (!red ? true : Number(red?.[1]) <= 12) &&
          (!green ? true : Number(green?.[1]) <= 13) &&
          (!blue ? true : Number(blue?.[1]) <= 14)
        );
      })
      .every((value) => value);
    return valid;
  })
  .map((line) => Number(line.split(":")[0].replace("Game ", "")))
  .reduce((a, b) => a + b);

console.log(validGamesTotal);
console.timeEnd("advent2");
