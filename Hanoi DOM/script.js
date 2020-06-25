var container = document.createElement("div")
container.setAttribute("class","wrap")
container.setAttribute("id","game")

var title = document.createElement("h1")
title.innerHTML = "Towers of Hanoi"

var pScreen = document.createElement("div")
pScreen.setAttribute("class", "play-screen")

var wrapT = document.createElement("div")
wrapT.setAttribute("class", "tower-wrap")

var towa1 = document.createElement("div")
towa1.setAttribute("class", "tower")

var dCon1 = document.createElement("div")
dCon1.setAttribute('class', 'disc-container')

var towa2 = document.createElement("div")
towa2.setAttribute("class", "tower")

var dCon2 = document.createElement("div")
dCon2.setAttribute("class", "disc-container")

var towa3 = document.createElement("div")
towa3.setAttribute("class", "tower")

var dCon3 = document.createElement("div")
dCon3.setAttribute("class", "disc-container")

var mCounter = document.createElement("SPAN")
mCounter.setAttribute("class", "moveCounter")
mCounter.innerHTML= "moves: "

var fMes = document.createElement("h2")
fMes.setAttribute("class", "finish")
fMes.innerHTML = "Congratulations! you did it in"

var mCounts = document.createElement("SPAN")
mCounts.setAttribute("class", "multiple hidden")
mCounts.innerHTML= "times"

var mCounts1 = document.createElement("SPAN")
mCounts1.setAttribute("class", "movesShower")
mCounts1.innerHTML= "moves" 

var best = document.createElement("SPAN")
best.setAttribute("class", "minimum hidden")
best.innerHTML=" The Best Possible Score! "

var ip = document.createElement("div")
ip.setAttribute("class", "input")

var nDisk = document.createElement("SPAN")
nDisk.innerHTML="Number of Disks "

var diffi = document.createElement("SELECT")
diffi.setAttribute("class", "difficulty")

var opt1 = document.createElement("OPTION")
opt1.setAttribute("value", "1")
opt1.innerHTML="1"

var opt2 = document.createElement("OPTION")
opt2.setAttribute("value", "2")
opt2.innerHTML="2"

var opt3 = document.createElement("OPTION")
opt3.setAttribute("value", "3")
opt3.innerHTML="3"

var opt4 = document.createElement("OPTION")
opt4.setAttribute("value", "4")
opt4.innerHTML="4"

var opt5 = document.createElement("OPTION")
opt5.setAttribute("value", "5")
opt5.innerHTML="5"

var opt6 = document.createElement("OPTION")
opt6.setAttribute("value", "6")
opt6.innerHTML="6"

var opt7 = document.createElement("OPTION")
opt7.setAttribute("value", "7")
opt7.innerHTML="7"

var opt8 = document.createElement("OPTION")
opt8.setAttribute("value", "8")
opt8.innerHTML="8"

var opt9 = document.createElement("OPTION")
opt9.setAttribute("value", "9")
opt9.innerHTML="9"

var opt10 = document.createElement("OPTION")
opt10.setAttribute("value", "10")
opt10.innerHTML="10"

var but1 = document.createElement("BUTTON")
but1.setAttribute("type", "button")
but1.setAttribute("class", "button playnew")
but1.innerHTML="Start New Game"

//parent-child append

document.body.appendChild(container)

container.appendChild(title)
container.appendChild(pScreen)

pScreen.appendChild(wrapT)
pScreen.appendChild(mCounter)
pScreen.appendChild(fMes)
pScreen.appendChild(ip)


wrapT.appendChild(towa1)
towa1.appendChild(dCon1)
wrapT.appendChild(towa2)
towa2.appendChild(dCon2)
wrapT.appendChild(towa3)
towa3.appendChild(dCon3)

fMes.appendChild(mCounts)
fMes.appendChild(mCounts1)
fMes.appendChild(best)

ip.appendChild(nDisk)
ip.appendChild(diffi)
ip.appendChild(but1)

diffi.appendChild(opt1)
diffi.appendChild(opt2)
diffi.appendChild(opt3)
diffi.appendChild(opt4)
diffi.appendChild(opt5)
diffi.appendChild(opt6)
diffi.appendChild(opt7)
diffi.appendChild(opt8)
diffi.appendChild(opt9)
diffi.appendChild(opt10)

//DOM manipulation with Javascript
var project = document.getElementById("game");
var finishEl = project.getElementsByClassName("finish")[0];
var finishMovesEl = finishEl.getElementsByClassName("movesShower")[0];
var finishMinimumEl = finishEl.getElementsByClassName("minimum")[0];
var finishMultipleEl = finishEl.getElementsByClassName("multiple")[0];

var moveCounterEl = project.getElementsByClassName("moveCounter")[0];
var difficultyEl = project.getElementsByClassName("difficulty")[0];
var playnewButtonEl = project.getElementsByClassName("playnew")[0];
var playgameButtonEl = project.getElementsByClassName("playgame")[0];


var towerEls = [].slice.call(project.getElementsByClassName("tower"), 0);

for(var i=0; i<towerEls.length; i++) {
  var towerEl = towerEls[i];
  towerEl.data = {}
  towerEl.data.index = i;
}


difficultyEl.onchange = function(e) {
  startnewGame();
}


var state = {
  startIndex: 0,
  timesDone: 0,
  skipInfo: 0,
  amount: 3,
  maxDiff: 10,
  stored: null,
  storedDisc: null,
  moves: 0,
  done: false,
};

if(localStorage == undefined) {
  localStorage = {}
}
if(localStorage.hanoiDifficulty == undefined) {
  localStorage.hanoiDifficulty = 3;
  localStorage.hanoistartIndex = 0;
  localStorage.skipInfo = 0;
}
state.amount = +localStorage.hanoiDifficulty;
difficultyEl.value = "" + state.amount;
state.startIndex = +localStorage.hanoistartIndex;


function init() {
  state.stored = null;
  state.moves = 0;
  state.done = false;
  state.timesDone = 0;
  hideFinish();
  for(var i=0; i<towerEls.length; i++) {
    var towerEl = towerEls[i];
    towerEl.onclick = towerClick;
    var discContainer = towerEl.children[0];
    empty(discContainer);
  }
  
  var towerEl = towerEls[state.startIndex];
  var discContainer = towerEl.children[0];
  
  for(var i=0; i<state.amount; i++) {
    var discEl = document.createElement("div");
    discEl.className = "disc d" + (state.maxDiff - state.amount + i + 1);
    discContainer.appendChild(discEl);
  }
  
  updateMoveCounter();
}
onkeydown = function(e) {
  var keyCode = e.keyCode || e.which;
  var fixedKC;
  if(keyCode > 36 && keyCode < 40) {
    fixedKC = keyCode - 37;
  } else if(keyCode > 48 && keyCode < 52) {
    fixedKC = keyCode - 49;
  }
  if(keyCode == 40) { fixedKC = 1 }
  
  if(fixedKC > -1 && fixedKC < 3) {
    choose(fixedKC);
  }
}

var towerClick = function() {
  choose(this.data.index);
}

var choose = function(index) {
  var towerEl = project.getElementsByClassName("tower")[index];
  var discEl = towerEl.children[0].children[0];
  if(state.stored == null) {
    if(discEl != undefined) {
      state.stored = index;
      state.storedDisc = discEl;
      discEl.className += " selected";
    }
  } else if(index == state.stored) {
    
    state.storedDisc.className = state.storedDisc.className.split(" ").slice(0,-1).join(" ");
    state.stored = null;
    
  } else {
    if(isStoredValid(discEl)) {
      doMove(towerEl.children[0], index);
    }
  }
}

var startnewGame = function() {
  var difficulty = +difficultyEl.value
  state.amount = difficulty;
  init();
}

playnewButtonEl.onclick = startnewGame;

var isStoredValid = function(discEl) {
  if(discEl == undefined) return true;
  var storedSize = +state.storedDisc.className.split(" ")[1].slice(1);
  var targetSize = +discEl.className.split(" ")[1].slice(1);
  
  var valid = false;
  if(targetSize > storedSize) {
    valid = true;
  }
  
  return valid;
}

var doMove = function(discContainerEl, fixedKC) {
  discContainerEl.insertBefore(state.storedDisc, discContainerEl.firstChild);
  state.storedDisc.className = state.storedDisc.className.split(" ").slice(0,-1).join(" ");
  state.stored = null;
  
  state.moves++;
  updateMoveCounter();
  checkIfDone(discContainerEl, fixedKC);
}

var checkIfDone = function(discContainerEl, fixedKC) {
  if(fixedKC != state.startIndex && discContainerEl.children.length == state.amount) {
    state.done = true;
    var newDifficulty = Math.min(state.amount + 1, state.maxDiff);
    difficultyEl.value = "" + newDifficulty
    localStorage.hanoiDifficulty = newDifficulty;
    state.startIndex = fixedKC;
    state.timesDone++;
    localStorage.hanoistartIndex = fixedKC;
    playnewButtonEl.focus();
    displayFinish();
  }
}

var updateMoveCounter = function() {
  moveCounterEl.firstChild.nodeValue = "moves: " + state.moves;
}

var displayFinish = function() {
  finishEl.className = finishEl.className.split(" ").slice(0, 1).join(" ");
  finishMovesEl.firstChild.nodeValue = state.moves;
  if(wasMinimalMoves()) {
    finishMinimumEl.className = "minimum";
  } else {
    finishMinimumEl.className = "minimum hidden";
  }
  
  if(state.timesDone > 1) {
    finishMultipleEl.className = "multiple";
    finishMultipleEl.firstChild.nodeValue = state.timesDone + " times ";
  } else {
    finishMultipleEl.className = "multiple hidden";
  }
  
}
var hideFinish = function() {
  finishEl.className += " hidden";
}

var empty = function(node) {
  var fc = node.firstChild;
  while(fc) {
    node.removeChild(fc);
    fc = node.firstChild;
  }
}

var wasMinimalMoves = function() {
  return (Math.pow(2, state.amount)-1) * state.timesDone == state.moves;
}

init();





