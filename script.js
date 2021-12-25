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
      width : ${this.width ? this.width + "px" : "content"};
      height : ${this.height ? this.height + "px" : "content"};
      background : ${this.bg ? this.bg : ""};
      font-size : ${this.fontSize}px;
      position : ${this.position ? this.position : "relative"}
    `;
  el.textContent = this.textContent;
  document.body.append(el);
  console.log(el);
  return el;
};

const div = new DomElement(
  ".sselector",
  "",
  "",
  "#bfb8f5",
  "24",
  "Новый элемент",
  "absolute"
);
console.log(div);
div.castElement();
