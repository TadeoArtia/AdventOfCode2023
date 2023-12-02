//Read from file
const fs = require('node:fs');
const colors = ['red', 'blue', 'green'];
const available = [12, 14, 13];


try {
  const data = fs.readFileSync('Ex2/input.txt', 'utf8');
  const array = data.split('\n');
  const part1 = solvePart1(array);
  const part2 = solvePart2(array);
  console.log('Part 1: ', part1)
  console.log('Part 2: ', part2)
} catch (err) {
  console.error(err);
}


function solvePart1(data){
    let res = 0;
    for(let i =0; i < data.length; i++){
        res += processLine(data[i])
    }
    return res
}

function solvePart2(data){
    let res = 0;
    for(let i =0; i < data.length; i++){
        res += processLine2(data[i])
    }
    return res
}

function processLine(data){
    const usedInGame = [0,0,0]
    let line = data.split(": ")[1];
    let id = data.split(":")[0].split(" ")[1].trim();
    line = line.split("; ").map(e => e.split(", "))

    for(let i =0; i < line.length; i++){
        for(let j =0; j < line[i].length; j++){
            const splitted = line[i][j].split(" ")
            const amount = parseInt(splitted[0]);
            const color = splitted[1];
            const index = colors.indexOf(color);
            usedInGame[index] = Math.max(usedInGame[index], amount);
        }
    }

    for(let i = 0; i < colors.length; i++){
        if(usedInGame[i] > available[i]) return 0;
    }
    return parseInt(id)
}

function processLine2(data){
    const usedInGame = [0,0,0]
    let line = data.split(": ")[1];
    line = line.split("; ").map(e => e.split(", "))

    for(let i =0; i < line.length; i++){
        for(let j =0; j < line[i].length; j++){
            const splitted = line[i][j].split(" ")
            const amount = parseInt(splitted[0]);
            const color = splitted[1];
            const index = colors.indexOf(color);
            usedInGame[index] = Math.max(usedInGame[index], amount);
        }
    }

    return usedInGame[0]*usedInGame[1]*usedInGame[2]
}