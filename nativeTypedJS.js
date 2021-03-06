// The size of variable textItem
var substrCount = 0
// The item that is currenly typed
var textItem = ''

function nativeTypedJS(options){
  // Define defaults
  // Providing options is optional
  options = defaultValue(options,{});

  // Assign default value's
  options.div = defaultValue(options.div,'ntjs')
  options.firstTimeStart = defaultValue(options.firstTimeStart,0)
  options.timeBeforeDeleting = defaultValue(options.timeBeforeDeleting,2000)
  options.timeBeforeNext = defaultValue(options.timeBeforeNext,1000)
  options.animationTime = (options.timeBeforeDeleting + options.timeBeforeNext) + 1 + defaultValue(options.animationTime,2000)
  options.cursorSpeed = defaultValue(options.cursorSpeed,1000)
  options.shuffle = defaultValue(options.shuffle,false)
  options.loop = defaultValue(options.loop,false)
  options.cursorPause = defaultValue(options.cursorPause,1000)

  // Extra time when ~ is used
  options.extraTime = 0;

  // Parent div
  parentDiv = document.getElementById(options.div)
  // Get all childrens of div (ie9+ browser compatibility)
  divChildrens = Array.prototype.slice.call(parentDiv.childNodes)
  // Amount of children
  childrenCount = divChildrens.length - 1
  // Save only ELEMENT_NODES (P elements) (because 'var childrens' also saves TEXT_NODES)
  pElements = []

  // Loop trough childrens of parent div
  divChildrens.forEach(function(item, i){
    // Only keep the ELEMENT_NODES (ELEMENT_NODE = P element = 1)
    if(item.nodeType === 1){
      pElements.push(item.textContent)
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
    masterP = document.createElement("p")
    parentDiv.appendChild(masterP)

    // Add text SPAN element
    textSpan = document.createElement("span")
    textSpan.id = "ntjsText"
    parentDiv.firstChild.appendChild(textSpan)

    // Add cursor SPAN element
    cursorSpan = document.createElement("span")
    cursorSpan.id = "ntjsCursor"
    cursorSpan.innerText = '|'
    parentDiv.firstChild.appendChild(cursorSpan)

    // Loop trough the old P elements
    pElementsCount = options.pElementsCount = pElements.length - 1
    whileLoopCount = 0
    makeAnimationLonger = 0;

    // shuffle array first (if shuffle = true)
    if(options.shuffle){
      shuffleArray(pElements);
    }
    function loopElements(){
      if(whileLoopCount <= pElementsCount){
        // Make the current typed item globally available (mainly for type() function)
        textItem = pElements[whileLoopCount]

        // Make time longer beacuse of ~
        countPauses = (textItem.match(/~/g) || []).length
        if(countPauses!=0){
          makeAnimationLonger = countPauses * options.cursorPause;
        }else{
          makeAnimationLonger = 0;
        }

        type(whileLoopCount)
        options.whileLoopCount = whileLoopCount++
        // It's like pausing the script, otherwise this loop is done in a few milisecond and you won't have an animation.
        setTimeout(loopElements,(options.animationTime + makeAnimationLonger))
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
    fadeOut(document.getElementById('ntjsCursor'));
    setTimeout(function() {
      fadeIn(document.getElementById('ntjsCursor'));
    }, (options.cursorSpeed / 2));
  }

  // Native javascript fadein (thanks to http://youmightnotneedjquery.com/)
  function fadeIn(el) {
    el.style.opacity = 0
    last = +new Date()
    tick = function() {
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
    last = +new Date()
    tick = function() {
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
    if(textItem.substr(substrCount,1)=='~'){
      textItem = textItem.replace('~', '')
      options.extraTime += options.cursorPause;
    }
    document.getElementById('ntjsText').innerHTML = textItem.substr(0,substrCount++)
    timeNextLetter = (options.animationTime - options.timeBeforeDeleting - options.timeBeforeNext) / 2 / textItem.length
    if(substrCount < textItem.length+1){
      setTimeout(type, (timeNextLetter + options.extraTime))
      options.extraTime = 0;
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
    document.getElementById('ntjsText').innerHTML = textItem.substr(0,substrCount--)
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
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
  }
}
