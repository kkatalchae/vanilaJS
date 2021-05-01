const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let toDos = [];
let finisheds = [];

function finishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintFinished(text);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintToDo(text);
  finishedList.removeChild(li);
  const cleanFinisheds = finisheds.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinisheds = finisheds.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const finBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerText = "v";
  finBtn.addEventListener("click", finishedToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const backBtn = document.createElement("button");
  const newId = finisheds.length + 1;
  span.innerText = text;
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteFinished);
  backBtn.innerText = "back";
  backBtn.addEventListener("click", backToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };
  finisheds.push(finishedObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedFinisheds = localStorage.getItem(FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedTODos = JSON.parse(loadedToDos);
    parsedTODos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinisheds !== null) {
    const parsedFinisheds = JSON.parse(loadedFinisheds);
    parsedFinisheds.forEach(function (finished) {
      paintFinished(finished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
