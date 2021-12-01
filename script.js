"Use strict";
let fullPrice;
// Название проекта (string)
const getTitle = () => {
  let title = prompt("Как называется Ваш проект?");
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
    "Какие типы экранов нужно разработать? (Простые, Сложные, Интерактивные)"
  );
  return screens.split(", ");
};

// Адапитив (boolean)
const isAdaptive = () => {
  return confirm("Нужен ли адаптив на сайте?");
};

// Стоимость работы (number)
const getScreenPrice = () => {
  return prompt("Сколько будет стоить данная работа?");
};

// Доп. услуги (number)
const getAllServicePrices = () => {
  let addOption1 = prompt(
    "Если нужен дополнительный тип услуги, то укажите какой:"
  );

  let addOptPrice1 = addOption1 ? prompt("Сколько это будет стоить?") : false;

  let addOption2 = addOption1
    ? prompt(
        "Возможно, Вы хотите добавить еще один тип услуги?\nЕсли да, то укажите какой:"
      )
    : false;

  let addOptPrice2 = addOption2 ? prompt("Сколько это будет стоить?") : false;

  return +addOptPrice1 + addOptPrice2;
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

// Функциональный блок

showTypeOf(getTitle());

// showTypeOf(getScreens());
console.log(getScreens());

showTypeOf(isAdaptive());

fullPrice = getFullPrice();

showTypeOf(fullPrice);
showTypeOf(getServicePercentPrices(fullPrice, 15));
showTypeOf(getDiscountInfo(fullPrice));

// ₽
