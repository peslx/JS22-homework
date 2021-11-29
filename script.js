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
  while (isNaN(t) || +t <= 0 || !parseInt(t)) {
    t = prompt(
      "ОШИБКА\nВведено некорректное значение. Можно указать только целое, положительно число."
    );
    if (t === null) {
      console.log(CANCEL);
      break;
    }
  }
  console.log(t === null ? "" : +t);
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
// let screens = validPrompt("Нужен ли адаптив на сайте? (Да/Нет)");
// while (
//   screens.toLowerCase() !== "да" &&
//   screens.toLowerCase() !== "нет" &&
//   screens !== CANCEL
// ) {
//   screens = validPrompt(
//     "Можно ввести только 'да' или 'нет' (Регистр не важен)"
//   ).toLowerCase();
//   if (screens === CANCEL) break;
// }
// screens = screens === "да" ? true : false;
// console.log(screens);

//5 Доп. услуги

// let addOption1 = screenPrice
//   ? validPrompt("Если нужен дополнительный тип услуги, то укажите какой:")
//   : false;

// let addOptPrice1 = addOption1
//   ? validPromptNumber("Сколько это будет стоить?")
//   : false;

// let addOption2 = addOptPrice1
//   ? validPrompt(
//       "Возможно, Вы хотите добавить еще один тип услуги?\nЕсли да, то укажите какой:"
//     )
//   : false;

// let addOptPrice2 = addOption2
//   ? validPromptNumber("Сколько это будет стоить?")
//   : false;
// console.log("addOption1 = " + addOption1);
// console.log("addOptPrice1 = " + addOptPrice1);
// console.log("addOption2 = " + addOption2);
// console.log("addOptPrice2 = " + addOptPrice2);

//6 Итоговая стоимость
// let fullPrice = screenPrice ? screenPrice + addOption1 + addOption2 : false;
// console.log("fullPrice = " + fullPrice);

// let rollback = 20;
// let servicePercentPrice = fullPrice - fullPrice * (rollback / 100);

// console.log(title);
// console.log(adaptive);
// console.log(screens);

// console.log(`Стоимость верстки экранов - ${screenPrice} рублей`);
// console.log(`Стоимость разработки сайта - ${fullPrice} рублей`);
// console.log(servicePercentPrice);
