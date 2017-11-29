var input = document.querySelector('#input')
var run = document.querySelector('#run')
var output = document.querySelector('#output')

run.onclick = function(){
  try{
    output.value = runJakeScript(input.value)
  }
  catch(err)
  {
    output.value = "You failed to comply with the strict standerds of JakeScript. You are a disgrace. JakeScript was designed for readability and ease of use, and you FAILED. I want nothing to do with you anymore from this day forth."
  }
}
