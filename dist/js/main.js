
// GLOBAL VARIABLES
var taskStorage = localStorage;
var taskArray, moveTimeBar, chrono;
var count = 0;
if (JSON.parse(taskStorage.getItem("userStorage")) === null) { taskArray = []; }
else { taskArray = JSON.parse(taskStorage.getItem('userStorage')); }

//ONLOAD
window.onload = function() {
  for (var i in taskArray) {
    var newTask = new Task(taskArray[i].name, taskArray[i].datecreation, taskArray[i].status);
    newTask.datecreation = new Date(taskArray[i].datecreation);
    newTask.draw()
  }
  var drake = dragula({
  copy: true
});
  
  dragula([document.querySelector('#left-col'), document.querySelector('#middle-col')]);
}

//LISTENERS
document.getElementById('add-task').addEventListener("submit", addTask);
document.getElementById('start-button').addEventListener("click", startTask);
document.getElementById('pause').addEventListener("click", pauseTask);
document.getElementById('end').addEventListener("click", endTask);


//FUNCTIONS
function addTask(event) {
  event.preventDefault();
  var newTask = new Task(document.getElementById('input-task').value, new Date(), 'added');
  taskArray.push(newTask);
  newTask.draw();
  updateLocalStorage();
}

function startTask() {
  console.log('ici')
  var currentTask;
  var radios = document.getElementsByName('waitingtasks');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) { currentTask = taskArray[i];  break; }
  }
  currentTask.status = 'running';
  document.getElementById("current-task").innerHTML = currentTask.name;
  var timebar = document.getElementById('timebar');
  var timePassed = document.getElementById('time-passed');
  moveTimeBar = setInterval(timeBar, 9000);
  chrono = setInterval(chronometer, 1000);
  setTimeout(function () {
    clearInterval(moveTimeBar);
    clearInterval(chrono);
  }, 1800000);
}

function pauseTask() {
  var self = document.getElementById(this.id);
  if (self.innerHTML == "Pause") {
  findTaskByName(document.getElementById("current-task").innerHTML).status = 'paused'
  clearInterval(moveTimeBar);
  clearInterval(chrono);
  self.innerHTML = "Resume";
  }
  else {
    startTask();
    self.innerHTML = "Pause";
  }
}

function endTask() {

}

function chronometer() {
  var heures = document.getElementById('hours');
  var minutes = document.getElementById('minutes');
  var secondes = document.getElementById('seconds');
  secondes.innerHTML ++;
  if (secondes.innerHTML == 60) {
    minutes.innerHTML ++;
    secondes.innerHTML = 0;
  }
  if (minutes.innerHTML == 60) {
    heures.innerHTML ++;
    minutes.innerHTML = 0;
  }

}

function timeBar() {
  count++;
  var timePassed = document.getElementById('time-passed');
  timePassed.style.backgroundColor = 'blue';
  timePassed.style.width = count + 'px';
}

function updateLocalStorage() {
  if (taskArray.length != 0) {taskStorage.setItem('userStorage', JSON.stringify(taskArray));}
  else {taskStorage.removeItem('userStorage');}
}

function findTaskByName(name) {
  function findTask(thisTask) {
    return thisTask.name == name;
  }
  return taskArray.find(findTask);
}

// CLASS
var Task = function(name, creationDate, status) {
  this.name = name;
  this.datecreation = creationDate;
  this.status = status;
  this.draw = function() {
    var label = document.createElement('label');
    label.setAttribute('for', 'radiobtn-' + this.name)
    label.setAttribute('id', 'waitingtask-' + this.name);
    label.textContent = this.name;
    var radioButton = document.createElement('input');
    radioButton.setAttribute('name', 'waitingtasks')
    radioButton.setAttribute('type', 'radio');
    radioButton.setAttribute('id', 'radiobtn-' + this.name);
    var li = document.createElement('li');
    li.appendChild(radioButton);
    li.appendChild(label);
    var waitingTasks = document.getElementById('waiting-tasks');
    waitingTasks.appendChild(li);
  }
}
