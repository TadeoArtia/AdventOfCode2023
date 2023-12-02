//Read from file
const fs = require('node:fs');

try {
  const data = fs.readFileSync('Ex1/input.txt', 'utf8');
  const array = data.split('\n');
  let result = 0;
  for(let i = 0 ; i < array.length; i++){
    result += getNumber(array[i]);
  }
  console.log(result)
} catch (err) {
  console.error(err);
}


function getNumber(data){
    let firstNumber = -1;
    let lastNumber = -1;
    const possibles = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    for(let i =0 ; i < data.length; i++){
        let current = data[i] 
        if(!isNaN(parseInt(current))){
            if(firstNumber == -1) firstNumber = current;
            lastNumber = current;
        }
        else{
            let helper = 0;
            let cont = true;
            let matching = possibles.slice();
            while(cont){
                current = data[i+helper]
                matching = matching.filter(p => p.charAt(helper) == current)
                if(matching.length == 1 && matching[0].length - 1 == helper){
                    if(firstNumber == -1) firstNumber = possibles.indexOf(matching[0]) + 1;
                    lastNumber = possibles.indexOf(matching[0]) + 1;
                }
                if(matching.length == 0){
                    cont = false;
                }
                helper++;
            }  
        }
    }
    return parseInt(firstNumber + '' + lastNumber);
}

