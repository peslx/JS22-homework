"Use strict";
const CANCEL = "Ввод отменен";
let fullPrice;
// Валидация prompt на полуение строки с отсечением пробелов (запрет ввода только пробелов))
const validPrompt = (text) => {
  let t;
  do {
    t = String(prompt(text));
    t = t.trim();
  } while (t === "");
  t === "null" ? console.log(CANCEL) : null;
  return t === "null" ? (t = false) : t;
};

// Валидация prompt на полуение целого положительного числа
const validPromptNumber = (text) => {
  let t = prompt(text);
  if (t === null) {
    console.log(CANCEL);
    return false;
  }
  while (isNaN(+t) || +t <= 0 || !parseInt(+t)) {
    t = prompt(
      "ОШИБКА\nВведено некорректное значение. Можно указать только целое, положительно число."
    );
    if (t === null) {
      console.log(CANCEL);
      break;
    }
  }
  return t === null ? false : +t;
};

// Вывод логов и типов данных
const showTypeOf = (data) => {
  console.log(data + `, (${typeof data})`);
};

// Название проекта (string)
const getTitle = () => {
  let title = validPrompt("Как называется Ваш проект?");
  if (title) {
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.substring(1);
  }
  return title;
};

// Типы экранов (string)
const getScreens = () => {
  let screens = validPrompt(
    "Какие типы экранов нужно разработать? (Простые/Сложные/Интерактивные)"
  );
  if (screens) {
    while (
      screens !== false &&
      screens.toLowerCase() !== "простые" &&
      screens.toLowerCase() !== "сложные" &&
      screens.toLowerCase() !== "интерактивные"
    ) {
      screens = validPrompt(
        "ОШИБКА\nМожно ввести только 'Простые', 'Сложные' или 'Интерактивные'"
      );
    }
  }
  return String(screens).split("");
};

// Адапитив (boolean)
const isAdaptive = () => {
  let adaptive = validPrompt("Нужен ли адаптив на сайте? (Да/Нет)");

  if (adaptive) {
    while (
      adaptive.toLowerCase() !== "да" &&
      adaptive.toLowerCase() !== "нет" &&
      adaptive !== CANCEL
    ) {
      adaptive = validPrompt(
        "Можно ввести только 'да' или 'нет' (Регистр не важен)"
      ).toLowerCase();
      if (adaptive === CANCEL) break;
    }

    return adaptive === "да" ? true : false;
  }
};

// Стоимость работы (number)
const getScreenPrice = () => {
  return validPromptNumber("Сколько будет стоить данная работа?");
};

// Доп. услуги (number)
const getAllServicePrices = () => {
  let addOption1 = validPrompt(
    "Если нужен дополнительный тип услуги, то укажите какой:"
  );

  let addOptPrice1 = addOption1
    ? validPromptNumber("Сколько это будет стоить?")
    : false;

  let addOption2 = addOptPrice1
    ? validPrompt(
        "Возможно, Вы хотите добавить еще один тип услуги?\nЕсли да, то укажите какой:"
      )
    : false;

  let addOptPrice2 = addOption2
    ? validPromptNumber("Сколько это будет стоить?")
    : false;

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

// Функциональный блок

showTypeOf(getTitle());
showTypeOf(getScreens());
showTypeOf(isAdaptive());

fullPrice = getFullPrice();
showTypeOf(fullPrice);

showTypeOf(getServicePercentPrices(fullPrice, 15));
showTypeOf(getDiscountInfo(fullPrice));

// ₽
