//Read from file
const fs = require("node:fs");

try {
  const data = fs.readFileSync("Ex3/input.txt", "utf8");
  const array = data.split("\n");

  
  const solutions = solve(array);
  console.log("Part 1: ", solutions[0]);
  console.log('Part 2: ', solutions[1])
} catch (err) {
  console.error(err);
}

function solve(data) {
  let numbers = []
  let gears = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (isSymbol(data[i][j])) {
        let obtained = checkSurroundings(data, i, j);
        obtained = obtained.filter((item, index, self) => self.findIndex(otherItem => item.every((value, i) => value === otherItem[i])) === index);

        numbers = numbers.concat(obtained)

        if(isGear(data, i, j, obtained)){
            if(obtained[0][0] < obtained[1][0]) gears.push([obtained[0], obtained[1]])
            if(obtained[0][0] > obtained[1][0]) gears.push([obtained[1], obtained[0]])
            if(obtained[0][0] == obtained[1][0]){
                if(obtained[0][1] < obtained[1][1]){
                    gears.push([obtained[0], obtained[1]])
                } 
                else{
                    gears.push([obtained[1], obtained[0]])
                }
            }
        }
      }
    }
  }

  const filteredNumbers = numbers.filter((item, index, self) => self.findIndex(otherItem => item.every((value, i) => value === otherItem[i])) === index);
  const sumFirstIndex = filteredNumbers.reduce((sum, item) => sum + item[0], 0);

//   console.log("GEARS", gears)
  gears = gears.filter((item, index, self) => self.findIndex(otherItem => JSON.stringify(otherItem) === JSON.stringify(item)) === index);

  const gearTotalRatio = gears.reduce((sum, item) => sum + (item[0][0] * item[1][0]), 0);
  return [sumFirstIndex, gearTotalRatio];
}

function isGear(data, i, j, numberData){
    return data[i][j] == '*' && numberData.length == 2;
}

function checkSurroundings(data, i, j) {
  const moves = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  
  const numbers = []
  for(let move of moves){
    const newI = i+move[0];
    const newJ = j+move[1];
    if(isInsideMatrix(data, newI, newJ)){
        if(!isNaN(parseInt(data[newI][newJ]))){
            const numberData = getNumberData(data, newI, newJ);
            numbers.push(numberData)
        }
    }
  }
  return numbers;
}

function getNumberData(data, i, j){
    let startIndex = j;
    let endIndex = j;
    while(isInsideMatrix(data, i, startIndex) && !isNaN(parseInt(data[i][startIndex]))) startIndex--;
    while(isInsideMatrix(data, i, endIndex) && !isNaN(parseInt(data[i][endIndex]))) endIndex++
    startIndex++;
    endIndex--;
    let number = ""
    for(let iter = startIndex; iter <= endIndex; iter++){
        number += data[i][iter];
    }
    return [parseInt(number), i, startIndex, endIndex]
}

function isSymbol(char) {
  return ["%", "#", "*", "/", "@", "$", "&", "=", "+", "-"].includes(char);
}

function isInsideMatrix(data, i, j) {
  return i >= 0 && j >= 0 && i < data.length && j < data[i].length;
}
