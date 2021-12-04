"Use strict";

const app = {
  data: {
    title: "",
    screens: "",
    adaptive: "",
    rollback: 15,
    screenPrice: 0,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrices: 0,
    discountInfo: "",
  },
  // Название проекта (string)
  getTitle: () => {
    let title = prompt("Как называется Ваш проект?", "Новый проект");
    if (title) {
      title = title.trim();
      title = title.toLowerCase();
      title = title[0].toUpperCase() + title.substring(1);
    }
    return title;
  },

  // Типы экранов (string)
  getScreens: () => {
    let screens = prompt(
      "Какие типы экранов нужно разработать",
      "Простые, Сложные, Интерактивные"
    );
    return screens.split(", ");
  },

  // Адапитив (boolean)
  isAdaptive: () => {
    return confirm("Нужен ли адаптив на сайте?");
  },

  // Проверка на число (boolean)
  isNum: (num) => {
    return (
      !isNaN(parseFloat(num)) && isFinite(num) && !String(num).includes(" ")
    );
  },

  // Стоимость работы (number)
  getScreenPrice: () => {
    let screenPrice;
    do {
      screenPrice = prompt(
        "Сколько будет стоить данная работа?",
        "    100000n  "
      );
    } while (!app.isNum(screenPrice) && screenPrice !== null);
    return +screenPrice;
  },

  // Доп. услуги (number)
  getAllServicePrices: () => {
    let addOption1 = prompt(
      "Если нужен дополнительный тип услуги, то укажите какой:",
      "Админ-панель"
    );

    let addOptPrice1;
    if (addOption1) {
      do {
        addOptPrice1 = prompt("Сколько это будет стоить?", 5000);
      } while (!app.isNum(addOptPrice1) && addOptPrice1 !== null);

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
      } while (!app.isNum(addOptPrice2) && addOptPrice2 !== null);

      if (addOptPrice2 === null) {
        addOptPrice2 = 0;
      } else {
        addOptPrice2 = isNaN(+addOptPrice2) ? 0 : +addOptPrice2;
      }
    } else {
      addOptPrice2 = 0;
    }

    return addOptPrice1 ? +addOptPrice1 + addOptPrice2 : 0;
  },

  // Итоговая стоимость (number)
  getFullPrice: () => app.data.screenPrice + app.data.allServicePrices,

  // Cтоимость за вычетом отката посреднику (number)
  getServicePercentPrices: (fullPrice, percent) =>
    Math.ceil(fullPrice - (fullPrice * percent) / 100),

  // Скидка (string)
  getDiscountInfo: (fullPrice) => {
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
  },

  // Старт ввода данных
  startQuiz: () => {
    app.data.title = app.getTitle();
    app.data.screens = app.getScreens();
    app.data.adaptive = app.isAdaptive();
    app.data.screenPrice = app.getScreenPrice();
    app.data.allServicePrices = app.getAllServicePrices();
    app.data.fullPrice = app.getFullPrice();
    app.data.servicePercentPrices = app.getServicePercentPrices(
      app.data.fullPrice,
      app.data.rollback
    );
    app.data.discountInfo = app.getDiscountInfo(app.data.fullPrice);
  },

  logger: (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty.call(obj, key)) {
        const el = obj[key];
        console.log(`(***${typeof el}***)\n${el}`);
        if (typeof el === "object") app.logger(el);
      }
    }
  },

  start: () => {
    app.startQuiz();
    app.logger(app);
  },
};

app.start();
