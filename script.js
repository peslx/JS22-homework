"Use strict";

const app = {
  data: {
    title: "",
    screens: "",
    adaptive: "",
    rollback: 15,
    screenPrice: 0,
    services: {},
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
    app.data.title = title;
  },

  // Типы экранов (string)
  getScreens: () => {
    let screens = prompt(
      "Какие типы экранов нужно разработать",
      "Простые, Сложные, Интерактивные"
    );
    app.data.screens = screens.split(", ");
  },

  // Адапитив (boolean)
  isAdaptive: () => {
    app.data.adaptive = confirm("Нужен ли адаптив на сайте?");
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
    app.data.screenPrice = +screenPrice;
  },

  // Доп. услуги (number)
  getAllServicePrices: () => {
    for (let i = 0; i < 2; i++) {
      let name = prompt(
        "Если нужен дополнительный тип услуги, то укажите какой:",
        "Админ-панель/База данных"
      );
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", 5000);
      } while (!app.isNum(price) && price !== null);
      app.data.services[`${i + 1}_${name}`] = +price;
    }

    for (const key in app.data.services) {
      app.data.allServicePrices += app.data.services[key];
    }
    console.log(JSON.stringify(app.data.services));
  },

  // Итоговая стоимость (number)
  getFullPrice: () =>
    (app.data.fullPrice = app.data.screenPrice + app.data.allServicePrices),

  // Cтоимость за вычетом отката посреднику (number)
  getServicePercentPrices: (fullPrice, percent) =>
    (app.data.servicePercentPrices = Math.ceil(
      fullPrice - (fullPrice * percent) / 100
    )),

  // Скидка (string)
  getDiscountInfo: (fullPrice) => {
    switch (true) {
      case fullPrice > 30000:
        app.data.discountInfo = "Даем скидку в 10%";
        break;

      case fullPrice >= 15000 && fullPrice <= 30000:
        app.data.discountInfo = "Даем скидку в 5%";
        break;

      case fullPrice >= 0 && fullPrice < 15000:
        app.data.discountInfo = "Скидка не предусмотрена";
        break;

      case fullPrice < 0:
        app.data.discountInfo = "Что то пошло не так";
        break;
    }
  },

  // Старт ввода данных
  startQuiz: () => {
    app.getTitle();
    app.getScreens();
    app.isAdaptive();
    app.getScreenPrice();
    app.getAllServicePrices();
    app.getFullPrice();
    app.getServicePercentPrices(app.data.fullPrice, app.data.rollback);
    app.getDiscountInfo(app.data.fullPrice);
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
