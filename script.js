"use strict";

const todoForm = document.querySelector(".todo-control");
const todoInput = document.querySelector(".header-input");

const todo = document.getElementById("todo");
const completed = document.getElementById("completed");

const todoData = [];

// Отрисовка базы данных списка дел
const renderData = () => {
  todo.innerHTML = "";
  completed.innerHTML = "";
  console.log(todoData);
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
    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.done = !item.done;
      renderData();
    });
    li.querySelector(".todo-remove").addEventListener("click", () => {
      todoData.splice(index, 1);
      renderData();
    });
  });
};

// Добавление элемента в список дел
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = {
    text: todoInput.value,
    done: false,
  };
  todoData.push(newTodo);
  todoInput.value = "";
  renderData();
});
