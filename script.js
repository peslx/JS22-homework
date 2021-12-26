"use strict";

const DomElement = function (
  selector,
  height,
  width,
  bg,
  fontSize,
  textContent,
  position
) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.textContent = textContent;
  this.position = position;
};

DomElement.prototype.castElement = function () {
  let el;
  if (this.selector[0] === ".") {
    el = document.createElement("div");
    el.classList.add(this.selector.slice(1));
  } else if (this.selector[0] === "#") {
    el = document.createElement("p");
    el.id = this.selector.slice(1);
  } else {
    el = document.createElement("div");
  }

  el.style.cssText = `
      width : ${this.width ? this.width + "px" : "auto"};
      height : ${this.height ? this.height + "px" : "auto"};
      background : ${this.bg ? this.bg : ""};
      font-size : ${this.fontSize}px;
      position : ${this.position ? this.position : "relative"}
    `;
  el.textContent = this.textContent;
  document.body.append(el);
  // console.log(el);
  // return el;
};

const div = new DomElement(
  ".selector",
  false,
  false,
  "#bfb8f5",
  "24",
  "Новый элемент",
  "absolute"
);
console.log(div);
div.castElement();

const Square = function (
  selector,
  height,
  width,
  bg,
  fontSize,
  textContent,
  position,
  top,
  left
) {
  DomElement.call(
    this,
    selector,
    height,
    width,
    bg,
    fontSize,
    textContent,
    position
  );
  this.top = top;
  this.left = left;
};

Square.prototype = Object.create(DomElement.prototype);
Square.prototype.locate = function () {
  const el = document.querySelector(this.selector);
  el.style.top = `${this.top}px`;
  el.style.left = `${this.left}px`;
};

const square = new Square(
  ".square",
  100,
  100,
  "yellow",
  "20",
  "КВАДРАТ",
  "absolute",
  100,
  100
);
square.castElement();
square.locate();
console.log(square);

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      square.top -= 10;
      square.locate();
      break;
    case "ArrowDown":
      square.top += 10;
      square.locate();
      break;
    case "ArrowRight":
      square.left += 10;
      square.locate();
      break;
    case "ArrowLeft":
      square.left -= 10;
      square.locate();
      break;
  }
});
