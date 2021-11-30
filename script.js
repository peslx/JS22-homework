"Use strict";
const CANCEL = "Ввод отменен";

const validPrompt = (text) => {
  let t;
  do {
    t = String(prompt(text));
    t = t.trim();
  } while (t === "");
  t === "null" ? console.log(CANCEL) : null;
  return t === "null" ? (t = false) : t;
};

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
  // console.log(t === null ? "" : +t);
  return t === null ? false : +t;
};

//1 Название проекта
let title = validPrompt("Как называется Ваш проект?");

//2 Типы экранов
let screens = title
  ? validPrompt(
      "Какие типы экранов нужно разработать? (Простые/Сложные/Интерактивные)"
    )
  : false;
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

//3 Стоимость работы
let screenPrice = screens
  ? validPromptNumber("Сколько будет стоить данная работа?")
  : false;

//4 Адапитив
let adaptive = screenPrice
  ? validPrompt("Нужен ли адаптив на сайте? (Да/Нет)")
  : false;

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
  adaptive = adaptive === "да" ? true : false;
  // console.log(adaptive);
}

//5 Доп. услуги

let addOption1 = screenPrice
  ? validPrompt("Если нужен дополнительный тип услуги, то укажите какой:")
  : false;

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

//6 Итоговая стоимость
let fullPrice = screenPrice ? screenPrice + addOptPrice1 + addOptPrice2 : 0;
let rollback = fullPrice * 0.2;
let servicePercentPrice = Math.ceil(fullPrice - rollback);

// Вывод переменных и типов данных в них
console.log(`title = ${title} (${typeof title})`);
console.log(`screens = ${screens} (${typeof screens})`);
console.log(`screenPrice = ${screenPrice} (${typeof screenPrice})`);
console.log(`adaptive = ${adaptive} (${typeof adaptive})`);
console.log(`addOption1 = ${addOption1} (${typeof addOption1})`);
console.log(`addOptPrice1 = ${addOptPrice1} (${typeof addOptPrice1})`);
console.log(`addOption2 = ${addOption2} (${typeof addOption2})`);
console.log(`addOptPrice2 = ${addOptPrice2} (${typeof addOptPrice2})`);
console.log(`fullPrice = ${fullPrice} (${typeof fullPrice})`);
console.log(
  `servicePercentPrice = ${servicePercentPrice} (${typeof servicePercentPrice})`
);

// Скидка
switch (true) {
  case fullPrice > 30000:
    console.log("Даем скидку в 10%");
    break;

  case fullPrice >= 15000 && fullPrice <= 30000:
    console.log("Даем скидку в 5%");
    break;

  case fullPrice >= 0 && fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    break;

  case fullPrice < 0:
    console.log("Что то пошло не так");
    break;
}

// ₽
