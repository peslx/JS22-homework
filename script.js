"use strict";

const btn = document.querySelector("#btn");
const innerBtn = document.querySelector("#e_btn");
const range = document.querySelector("#range");
const rangeSpan = document.querySelector("#range-span");
const text = document.querySelector("#text");
const square = document.querySelector("#square");
const circle = document.querySelector("#circle");

rangeSpan.textContent = range.value;
circle.style.width = `${range.value}%`;
circle.style.height = `${range.value}%`;
innerBtn.style.display = "none";

btn.addEventListener("click", () => {
  if (text.value !== "") {
    square.style.backgroundColor = text.value;
    text.value = "";
  }
});

range.addEventListener("input", () => {
  rangeSpan.textContent = range.value;
  circle.style.width = `${range.value}%`;
  circle.style.height = `${range.value}%`;
});
