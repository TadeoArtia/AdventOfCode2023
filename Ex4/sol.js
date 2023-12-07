//Read from file
const fs = require("node:fs");

try {
  const initTime = new Date();
  const data = fs.readFileSync("Ex4/input.txt", "utf8");
  const array = data.split("\n");

  
  const solutions = solve(array);
  const endTime = new Date();
  console.log("Part 1: ", solutions[0]);
  console.log('Part 2: ', solutions[1]);
  console.log("Time taken", (endTime.getTime() - initTime.getTime())/1000, "s");
} catch (err) {
  console.error(err);
}

function solve(data) {

  let part1 = 0;
  let part2 = 0;

  let dataCopies = new Array(data.length).fill(1);

  for(let i =0; i < data.length; i++){
    const line = data[i];
    const dataNumbers = line.split(":")[1];
    const winningNumbers = new Set(dataNumbers.split("|")[0].trim().split(" ").map(n => parseInt(n.trim())).filter(n => !isNaN(n)));
    const myNumbers = new Set(dataNumbers.split("|")[1].trim().split(" ").map(n => parseInt(n.trim())).filter(n => !isNaN(n)));

    part1 += solvePart1(winningNumbers, myNumbers);
    for(let j = 0; j < dataCopies[i]; j++){
      solvePart2(dataCopies, i, winningNumbers, myNumbers);
    }

    part2 = dataCopies.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  return [part1, part2]
}

function solvePart1(winningNumbers, myNumbers ){
  let res =0;
  for(let n of myNumbers){
    if(winningNumbers.has(n)) res++;
  }

  return res > 0 ? 1 << (res-1) : 0
}

function solvePart2(dataCopies, index, winningNumbers, myNumbers ){
  let res =0;
  for(let n of myNumbers){
    if(winningNumbers.has(n)) res++;
  }

  for(let i =0; i < res; i++){
    if(index+i+1 < dataCopies.length){
      dataCopies[index+i+1]++;
    }
  }
}