// The size of variable textItem
var substrCount = 0
// The item that is currenly typed
var textItem = ''

function nativeTypedJS(options){
  // Define defaults
  // Providing options is optional
  options = defaultValue(options,{});

  // Assign default value's
  options.div = defaultValue(options.div,'whereMagicHappens')
  options.firstTimeStart = defaultValue(options.firstTimeStart,0)
  options.animationTime = defaultValue(options.animationTime,5000)
  options.timeBeforeDeleting = defaultValue(options.timeBeforeDeleting,2000)
  options.timeBeforeNext = defaultValue(options.timeBeforeNext,1000)
  options.cursorSpeed = defaultValue(options.cursorSpeed,1000)
  options.shuffle = defaultValue(options.shuffle,false)
  options.loop = defaultValue(options.loop,false)

  // Parent div
  var parentDiv = document.getElementById(options.div)
  // Get all childrens of div
  var divChildrens = parentDiv.childNodes
  // Amount of children
  var childrenCount = divChildrens.length - 1
  // Save only ELEMENT_NODES (P elements) (because 'var childrens' also saves TEXT_NODES)
  var pElements = []

  // Provide error when animationTime is too short (otherwise it causes weird behaviour)
  if((options.timeBeforeDeleting + options.timeBeforeNext) >= options.animationTime){
    parentDiv.innerHTML = 'Your options timeBeforeDeleting (' + options.timeBeforeDeleting + 'ms) and timeBeforeNext (' + options.timeBeforeNext + 'ms) combined (' + (options.timeBeforeDeleting+options.timeBeforeNext) + 'ms) should be less than animationTime (' + options.animationTime + 'ms)'
    return
  }

  // Loop trough childrens of parent div
  divChildrens.forEach(function(item, i){
    // Only keep the ELEMENT_NODES (ELEMENT_NODE = P element = 1)
    if(item.nodeType === 1){
      pElements.push(item.innerHTML)
    }

    // End of foreach
    if(childrenCount === i){
      // We got our filtered result (only P elements)
      typeEffect(pElements)
    }
  });

  function typeEffect(pElements){
    // Empty parent div (the P elements where only there for SEO friendliness)
    emptyParentDiv()

    // Add one P element
    var masterP = document.createElement("p")
    parentDiv.appendChild(masterP)

    // Add text SPAN element
    var textSpan = document.createElement("span")
    textSpan.id = "typedText"
    parentDiv.firstChild.appendChild(textSpan)

    // Add cursor SPAN element
    var cursorSpan = document.createElement("span")
    cursorSpan.id = "cursor"
    cursorSpan.innerText = '|'
    parentDiv.firstChild.appendChild(cursorSpan)

    // Loop trough the old P elements
    var pElementsCount = options.pElementsCount = pElements.length - 1
    var whileLoopCount = 0

    // shuffle array first (if shuffle = true)
    if(options.shuffle){
      shuffleArray(pElements);
    }
    function loopElements(){
      if(whileLoopCount <= pElementsCount){
        // Make the current typed item globally available (mainly for type() function)
        textItem = pElements[whileLoopCount]
        type(whileLoopCount)
        options.whileLoopCount = whileLoopCount++
        // It's like pausing the script, otherwise this loop is done in a few milisecond and you won't have an animation.
        setTimeout(loopElements,options.animationTime)
      }else{
        // start all over (if loop = true)
        if(options.loop){
          whileLoopCount = 0
          loopElements()
        }
      }
    }

    // Force one loop (start)
    setTimeout(loopElements,options.firstTimeStart)

    // Let the cursor blink (cursor span element)
    cursorAnimation()
    setInterval(cursorAnimation, options.cursorSpeed)
  }

  // Clean parent div
  function emptyParentDiv(){
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild)
    }
  }

  // Let the cursor fadeout and fadein
  function cursorAnimation() {
    fadeOut(document.getElementById('cursor'));
    setTimeout(function() {
      fadeIn(document.getElementById('cursor'));
    }, (options.cursorSpeed / 2));
  }

  // Native javascript fadein (thanks to http://youmightnotneedjquery.com/)
  function fadeIn(el) {
    el.style.opacity = 0
    var last = +new Date()
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 100
      last = +new Date()
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    }
    tick()
  }

  // Native javascript fadeout (thanks to http://youmightnotneedjquery.com/)
  function fadeOut(el) {
    el.style.opacity = 1
    var last = +new Date()
    var tick = function() {
      el.style.opacity = +el.style.opacity - (new Date() - last) / 100
      last = +new Date()
      if (+el.style.opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    }
    tick()
  }

  // Native typing effect (each letter with a pause) thanks to: stathisg https://codepen.io/stathisg/pen/Bkvhg
  function type(loops){
    document.getElementById('typedText').innerHTML = textItem.substr(0,substrCount++)
    timeNextLetter = (options.animationTime - options.timeBeforeDeleting - options.timeBeforeNext) / 2 / textItem.length
    if(substrCount < textItem.length+1){
      setTimeout(type, timeNextLetter)
    }else{
      if(options.whileLoopCount == options.pElementsCount && !options.loop){
        // do not delete the text if there is no loop
      }else{
        setTimeout(erase, options.timeBeforeDeleting)
      }
    }
  }

  // Native erasing effect (each letter with a pause) thanks to: stathisg https://codepen.io/stathisg/pen/Bkvhg
  function erase(){
    document.getElementById('typedText').innerHTML = textItem.substr(0,substrCount--)
    timeNextLetter = (options.animationTime - options.timeBeforeDeleting - options.timeBeforeNext) / 2 / textItem.length
    if(substrCount >= 0){
      setTimeout(erase, timeNextLetter)
    }else{
      substrCount = 0
      textItem = ''
    }
  }

  // Default value assign
  function defaultValue(variable, value){
    if (typeof variable === 'undefined') {
      return variable = value
    }else{
      return variable
    }
  }

  // Durstenfeld shuffle thanks to: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
  }
}
