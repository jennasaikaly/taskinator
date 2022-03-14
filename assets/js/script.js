var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function(event){    //single responsibility principle; wrap the task item creation in a function to keep it separate and organized.
  event.preventDefault();
  
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
}
formEl.addEventListener("submit", createTaskHandler);