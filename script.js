"Use strict";

let title;
let screens;
let adaptive;
let fullPrice;
let servicePercentPrices;
let discountInfo;

// Название проекта (string)
const getTitle = () => {
  let title = prompt("Как называется Ваш проект?", "Новый проект");
  if (title) {
    title = title.trim();
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.substring(1);
  }
  return title;
};

// Типы экранов (string)
const getScreens = () => {
  let screens = prompt(
    "Какие типы экранов нужно разработать",
    "Простые, Сложные, Интерактивные"
  );
  return screens.split(", ");
};

// Адапитив (boolean)
const isAdaptive = () => {
  return confirm("Нужен ли адаптив на сайте?");
};

// Проверка на число (boolean)
const isNum = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num) && !String(num).includes(" ");
};

// Стоимость работы (number)
const getScreenPrice = () => {
  let screenPrice;
  do {
    screenPrice = prompt(
      "Сколько будет стоить данная работа?",
      "    100000n  "
    );
  } while (!isNum(screenPrice) && screenPrice !== null);
  return +screenPrice;
};

// Доп. услуги (number)
const getAllServicePrices = () => {
  let addOption1 = prompt(
    "Если нужен дополнительный тип услуги, то укажите какой:",
    "Админ-панель"
  );

  let addOptPrice1;
  if (addOption1) {
    do {
      addOptPrice1 = prompt("Сколько это будет стоить?", 5000);
    } while (!isNum(addOptPrice1) && addOptPrice1 !== null);

    if (addOptPrice1 === null) {
      addOptPrice1 = 0;
    } else {
      addOptPrice1 = isNaN(+addOptPrice1) ? 0 : +addOptPrice1;
    }
  }

  let addOption2 = addOptPrice1
    ? prompt(
        "Возможно, Вы хотите добавить еще один тип услуги?\nЕсли да, то укажите какой:",
        "База данных"
      )
    : false;

  let addOptPrice2;
  if (addOption2 && addOption2 !== null) {
    do {
      addOptPrice2 = prompt("Сколько это будет стоить?", 3500);
    } while (!isNum(addOptPrice2) && addOptPrice2 !== null);

    if (addOptPrice2 === null) {
      addOptPrice2 = 0;
    } else {
      addOptPrice2 = isNaN(+addOptPrice2) ? 0 : +addOptPrice2;
    }
  } else {
    addOptPrice2 = 0;
  }

  return addOptPrice1 ? +addOptPrice1 + addOptPrice2 : 0;
};

// Итоговая стоимость (number)
const getFullPrice = () => getScreenPrice() + getAllServicePrices();

// Cтоимость за вычетом отката посреднику (number)
const getServicePercentPrices = (fullPrice, percent) =>
  Math.ceil(fullPrice - (fullPrice * percent) / 100);

// Скидка (string)
const getDiscountInfo = (fullPrice) => {
  switch (true) {
    case fullPrice > 30000:
      return "Даем скидку в 10%";
      break;

    case fullPrice >= 15000 && fullPrice <= 30000:
      return "Даем скидку в 5%";
      break;

    case fullPrice >= 0 && fullPrice < 15000:
      return "Скидка не предусмотрена";
      break;

    case fullPrice < 0:
      return "Что то пошло не так";
      break;
  }
};

// Вывод логов и типов данных
const showTypeOf = (data) => {
  console.log(data + " " + typeof data);
};

// Старт ввода данных
const startQuiz = () => {
  title = getTitle();
  screens = getScreens();
  adaptive = isAdaptive();
  fullPrice = getFullPrice();
};

// Функциональный блок
startQuiz();
servicePercentPrices = getServicePercentPrices(fullPrice, 15);
discountInfo = getDiscountInfo(fullPrice);

showTypeOf(title);
console.log(screens);
showTypeOf(adaptive);
showTypeOf(fullPrice);
showTypeOf(servicePercentPrices);
showTypeOf(discountInfo);

// ₽
