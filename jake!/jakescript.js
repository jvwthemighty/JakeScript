//BrainFuck Interpreters
var parse = (function () {
  var input;
  var output;
  var data;
  var ptr;
  var debug = false;

  var ops = {
    '+': function () {
      data[ptr] = data[ptr] || 0;
      data[ptr]++;
      debug && console.log('+', data[ptr], ptr);
    },

    '-': function () {
      data[ptr] = data[ptr] || 0;
      data[ptr]--;
      debug && console.log('-', data[ptr], ptr);
    },

    '<': function () {
      ptr--;
      if (ptr < 0) {
        ptr = 0; //Don't allow pointer to leave data array
      }
      debug && console.log('<', ptr);
    },

    '>': function () {
      ptr++;
      debug && console.log('>', ptr);
    },

    '.': function () {
      var c = String.fromCharCode(data[ptr]);
      output.push(c);
      debug && console.log('.', c, data[ptr]);
    },

    ',': function () {
      var c = input.shift();
      if (typeof c == "string") {
        data[ptr] = c.charCodeAt(0);
      }
      debug && console.log(',', c, data[ptr]);
    },
  };

  function program(nodes) {
    return function (inputString) {
      output = [];
      data = [];
      ptr = 0;

      input = inputString && inputString.split('') || [];

      nodes.forEach(function (node) {
        node();
      });

      return output.join('');
    }
  }

  function loop(nodes) {
    return function () {
      var loopCounter = 0;

      while(data[ptr] > 0) {
        if (loopCounter++ > 10000) { throw "Infinite loop detected"; }

        nodes.forEach(function (node) {
          node();
        });
      }
    };
  }



  var programChars;

  function parseProgram() {
    var nodes = [];
    var nextChar;

    while (programChars.length > 0) {
      nextChar = programChars.shift();
      if (ops[nextChar]) {
        nodes.push(ops[nextChar]);
      } else if (nextChar == '[') {
        nodes.push(parseLoop());
      } else if (nextChar == ']') {
        throw "Missing opening bracket";
      } else {
        // ignore it
      }
    }

    return program(nodes);
  }

  function parseLoop() {
    var nodes = [];
    var nextChar;

    while (programChars[0] != ']') {
      nextChar = programChars.shift();
      if (nextChar == undefined) {
        throw "Missing closing bracket";
      } else if (ops[nextChar]) {
        nodes.push(ops[nextChar]);
      } else if (nextChar == '[') {
        nodes.push(parseLoop());
      } else {
        // ignore it
      }
    }
    programChars.shift(); //discard ']'

    return loop(nodes);
  }

  function parse(str) {
    programChars = str.split('');
    return parseProgram();
  }

  return parse;
})();


function runBrainFuck(code, input) {
  return parse(code)(input);
}


const brainFuckCommands =
['>','<','+','-','.',',','[',']']
const jakeScriptCommands =
['Jake!', 'White!','Jake.','Amazing','Talented', 'Great', 'Dashing', 'White.', "Hey, No Looking At The Source Code"]

function jakeToFuck(code){
  var splitCode = code.split(' ')
  var compiledCode = ''

  for (var i=0; i<splitCode.length; i++){
    let currentCommand = splitCode[i]
    compiledCode += brainFuckCommands[jakeScriptCommands.indexOf(currentCommand)]
  }
  return compiledCode
}

function fuckToJake(splitCode){
  var compiledCode = ''

  for (var i=0; i<splitCode.length; i++){
    let currentCommand = splitCode[i]
    compiledCode += jakeScriptCommands[brainFuckCommands.indexOf(currentCommand)]
    if (i != splitCode.length-1){ //Check its not the last one
    compiledCode += ' '}
  }
  return compiledCode
}


function runJakeScript(script){
  console.log("Running JakeScript on: "+script)
  return runBrainFuck(jakeToFuck(script))
}

//Tests
console.log(runJakeScript('Jake. Jake. Jake. Jake. Jake. Jake. Jake. Jake. Dashing Jake! Jake. Jake. Jake. Jake. Dashing Jake! Jake. Jake. Jake! Jake. Jake. Jake. Jake! Jake. Jake. Jake. Jake! Jake. White! White! White! White! Amazing White. Jake! Jake. Jake! Jake. Jake! Amazing Jake! Jake! Jake. Dashing White! White. White! Amazing White. Jake! Jake! Talented Jake! Amazing Amazing Amazing Talented Jake. Jake. Jake. Jake. Jake. Jake. Jake. Talented Talented Jake. Jake. Jake. Talented Jake! Jake! Talented White! Amazing Talented White! Talented Jake. Jake. Jake. Talented Amazing Amazing Amazing Amazing Amazing Amazing Talented Amazing Amazing Amazing Amazing Amazing Amazing Amazing Amazing Talented Jake! Jake! Jake. Talented Jake! Jake. Jake. Talented'))
