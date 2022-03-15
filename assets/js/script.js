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


  //using taskIDCounter as the argument now to create
  //buttons that correspond to the current task ID.
  //createTaskActions returns a DOM element, so we can store
  //that element in the var taskActionsEl
  var taskActionsEl = createTaskActions(taskIdCounter);
 //append taskActionsEl to listItemEl
 listItemEl.appendChild(taskActionsEl);
//append listItemEl to taskToDoEl
tasksToDoEl.appendChild(listItemEl);

 // add entire list item to list
 tasksToDoEl.appendChild(listItemEl);

 // increase task counter for next unique id
 taskIdCounter++;
};

// function to dynamically create buttons
var createTaskActions = function(taskId) {  //taskId parameter is how we will pass a diff id 
   //create div that will be a container 
   //for the other elements and
   //give the div a class name
var actionContainerEl = document.createElement("div"); //into the  function each time to keep track of
actionContainerEl.className = "task-actions";            //which elements we are creating for which task                                

// create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

//create select element
var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEl);

//creating an array to facilitate loop and make it easier
//to add more options later w/o having to add much code (DRY)
var statusChoices = ["To Do", "In Progress", "Completed"];

//creating a loop because we need to provide 3 options and
//therefore write that code 3 times.  The loop helps us DRY

for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

return actionContainerEl;
};                                         

formEl.addEventListener("submit", taskFormHandler);