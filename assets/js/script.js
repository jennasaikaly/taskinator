var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function (event) {
    //debugger;
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  formEl.reset(); //resets form for the next task
  
  // package up data as an object  **lexical scoping
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send it as an argument to createTaskEl **lexical scoping
  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj){
 // create list item
 var listItemEl = document.createElement("li");
 listItemEl.className = "task-item";

 // add task id as a custom attribute
 listItemEl.setAttribute("data-task-id", taskIdCounter);

 // create div to hold task info 
 var taskInfoEl = document.createElement("div");
 taskInfoEl.className = "task-info";
  // add HTML content to div
 //*lexical scoping
 // old line when there was only one funcion taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
 // new/updated line:
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl); //add to list item
 // add entire list item to list
 tasksToDoEl.appendChild(listItemEl);

 // increase task counter for next unique id
 taskIdCounter++;
};


formEl.addEventListener("submit", taskFormHandler);