"use strict";

const books = document.querySelectorAll(".book");
const adv = document.querySelector(".adv");
const book3title = books[4].querySelector("h2 > a");
const book2Li = books[0].querySelectorAll("li");
const book5Li = books[5].querySelectorAll("li");
const book6Li = books[2].querySelectorAll("li");

adv.remove();
book3title.textContent = "Книга 3. this и Прототипы Объектов";

books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);

console.log(books);
console.log(book2Li);
console.log(book5Li);
console.log(book6Li);
