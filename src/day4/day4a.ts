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

// for convenience, let's make each line into an object
type Stone = {
  xPos: number;
  yPos: number;
  zPos: number;
  xVel: number;
  yVel: number;
  zVel: number;
};
const stones: Stone[] = lines.map((line) => {
  const [position, velocity] = line.split(" @ ");
  const [xPos, yPos, zPos] = position.split(", ");
  const [xVel, yVel, zVel] = velocity.split(", ");
  return {
    xPos: parseInt(xPos),
    yPos: parseInt(yPos),
    zPos: parseInt(zPos),
    xVel: parseInt(xVel),
    yVel: parseInt(yVel),
    zVel: parseInt(zVel),
  };
});
for (let i = 0; i < stones.length; i++) {
  for (let j = i + 1; j < stones.length; j++) {
    const dx = stones[j].xPos - stones[i].xPos;
    const dy = stones[j].yPos - stones[i].yPos;
    const dvx = stones[j].xVel - stones[i].xVel;
    const dvy = stones[j].yVel - stones[i].yVel;

    const t = -(dx * dvx + dy * dvy) / (dvx * dvx + dvy * dvy);

    if (t >= 0 && t <= 20) {
      const xI = stones[i].xPos + t * stones[i].xVel;
      const yI = stones[i].yPos + t * stones[i].yVel;
      const xJ = stones[j].xPos + t * stones[j].xVel;
      const yJ = stones[j].yPos + t * stones[j].yVel;

      if (xI === xJ && yI === yJ) {
        console.log(`Stones ${i} and ${j} collide at (${xI}, ${yI})`);
      }
    }
  }
}
for (let t = 0; t <= 20; t++) {
  // Move each stone
  for (let stone of stones) {
    stone.xPos += stone.xVel;
    stone.yPos += stone.yVel;
    stone.zPos += stone.zVel;
  }

  // Check for collisions
  for (let i = 0; i < stones.length; i++) {
    for (let j = i + 1; j < stones.length; j++) {
      if (
        stones[i].xPos === stones[j].xPos &&
        stones[i].yPos === stones[j].yPos &&
        stones[i].zPos === stones[j].zPos
      ) {
        console.log(
          `Stones ${i} and ${j} collide at (${stones[i].xPos}, ${stones[i].yPos}, ${stones[i].zPos})`
        );
      }
    }
  }
}

console.timeEnd("advent4a");
