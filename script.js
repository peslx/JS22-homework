"use strict";

class First {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log("Привет я метод родителя!");
  }
}

class Second extends First {
  hello() {
    super.hello();
    console.log("А я наследуемый метод!");
  }
}

const first = new First("Родительский класс");
const second = new Second("Наследуемый класс");

console.log(first);
first.hello();

console.log(second);
second.hello();
