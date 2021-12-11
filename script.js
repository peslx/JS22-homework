"use strict";

const books = document.querySelectorAll(".book");
const adv = document.querySelector(".adv");
const book3title = books[4].querySelector("h2 > a");
const book2Li = books[0].querySelectorAll("li");
const book5Li = books[5].querySelectorAll("li");
const book6 = books[2].querySelector("ul");
const book6Li = books[2].querySelectorAll("li");

adv.remove();
book3title.textContent = "Книга 3. this и Прототипы Объектов";

// Порядок книг
books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);

// Порядок глав во 2 книге
book2Li[4].before(book2Li[6]);
book2Li[4].before(book2Li[8]);
book2Li[9].after(book2Li[2]);

// Порядок глав в 5 книге
book5Li[3].before(book5Li[9]);
book5Li[6].before(book5Li[2]);
book5Li[8].before(book5Li[5]);

// Глава 8 в 6 книге
const b6h8 = document.createElement("li");
b6h8.textContent = "Глава 8: За пределами ES6";
book6Li[9].before(b6h8);
