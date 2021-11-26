"Use strict";

// 1
let title = "JS22-homework",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 1200,
  rollback = 20,
  fullPrice = 10000,
  adaptive = true;

// 2
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов - ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта - ${fullPrice} рублей`);
console.log(fullPrice * (rollback / 100));
