var input = document.querySelector('#input')
var run = document.querySelector('#run')
var output = document.querySelector('#output')

run.onclick = function(){
  output.value = runJakeScript(input.value)
}
