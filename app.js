"use strict"; //använd modern javascript

const LOCAL_STORAGE_KEY_TODOS = "app.todos";

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS)) || [];

let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (listInput.value.trim() === "") {
    return;
  }
  todos.push(listInput.value.trim());
  updatera();
  listInput.value = "";
});

function attgöraList(items) {
  let list = document.createElement("ul");
  items.forEach((item) => {
    let todoListItem = document.createElement("li");
    todoListItem.innerText = item;
    todoListItem.classList.add("todo-list-item");
    todoListItem.addEventListener("click", tabortItem);
    list.append(todoListItem);
  });
  return list;
}

function tabortItem(event) {
  let itemToRemove = event.target.innerText;
  todos = todos.filter((item) => item !== itemToRemove);
  updatera();
}

function updatera() {
  spara();
  listRoot.innerHTML = "";
  listRoot.append(attgöraList(todos));
}

function spara() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
}

updatera();
