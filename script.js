"use strict";

const todoForm = document.querySelector(".todo-control");
const todoInput = document.querySelector(".header-input");
const todo = document.getElementById("todo");
const completed = document.getElementById("completed");

let todoData;

// Загрузка данных из localStorage (первый запуск)
const loadData = () => {
  if (Boolean(localStorage.getItem("todoData"))) {
    todoData = JSON.parse(localStorage.getItem("todoData"));
  } else {
    todoData = [];
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }
};

// Сохранение данных в localStorage
const saveData = () => {
  localStorage.setItem("todoData", JSON.stringify(todoData));
};

// Сбор данных из localStorage
const readData = () => {
  todoData = JSON.parse(localStorage.getItem("todoData"));
};

// Отрисовка базы данных списка дел
const renderData = () => {
  saveData();
  readData();
  todo.innerHTML = "";
  completed.innerHTML = "";
  todoData.forEach((item, index) => {
    // console.log(item);
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
    <span class="text-todo">${item.text}</span>
	<div class="todo-buttons">
		<button class="todo-remove"></button>
		<button class="todo-complete"></button>
	</div>`;

    item.done ? completed.append(li) : todo.append(li);

    // Действия по кнопкам
    // Изменение статуса
    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.done = !item.done;
      renderData();
    });

    // Удаление
    li.querySelector(".todo-remove").addEventListener("click", () => {
      todoData.splice(index, 1);
      renderData();
    });
  });
};

loadData();
renderData();

// Добавление элемента в список дел
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // проверить на пустую строку
  // todoInput.value
  let t;

  t = todoInput.value;
  t = todoInput.value.trim();

  if (t === "") {
    todoInput.value = "";
    alert("Нельзя вводить пустое значение!\nПовторите ввод");
  } else {
    const newTodo = {
      text: t,
      done: false,
    };
    todoData.push(newTodo);
    todoInput.value = "";
    renderData();
  }
});
