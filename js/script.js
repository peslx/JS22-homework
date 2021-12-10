"Use strict";

const app = {
  data: {
    title: "",
    screens: [],
    adaptive: "",
    rollback: 15,
    screenPrice: 0,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrices: 0,
    discountInfo: "",
  },

  // Проверка на число (boolean)
  isNum: (num) => {
    return (
      !isNaN(parseFloat(num)) && isFinite(num) && !String(num).includes(" ")
    );
  },

  // Название проекта (string)
  getTitle: () => {
    let title;
    do {
      title = prompt("Как называется Ваш проект?", "Новый проект");
      if (title) {
        title = title.trim();
        title = title.toLowerCase();
        title = title[0].toUpperCase() + title.substring(1);
      }
    } while (!isNaN(+title) && title !== null);

    // let title = prompt("Как называется Ваш проект?", "Новый проект");
    // if (title) {
    //   title = title.trim();
    //   title = title.toLowerCase();
    //   title = title[0].toUpperCase() + title.substring(1);
    // }

    app.data.title = title;
  },

  // Типы экранов (string)
  getScreens: () => {
    for (let i = 0; i < 2; i++) {
      let name;

      do {
        name = prompt(
          "Какие типы экранов нужно разработать",
          "Простые, Сложные, Интерактивные"
        );
        if (name) {
          name = name.trim();
          name = name.toLowerCase();
          name = name[0].toUpperCase() + name.substring(1);
        }
      } while (!isNaN(+name) && name !== null);

      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?", "    100000n  ");
      } while (!app.isNum(price) && price !== null);

      app.data.screens.push({ id: i, name, price: +price });
    }
  },

  // Адапитив (boolean)
  isAdaptive: () => {
    app.data.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // Стоимость работы (number)
  getScreenPrice: () => {
    //   for (const screen of app.data.screens) {
    //     app.data.screenPrice += +screen.price;
    //   }

    app.data.screenPrice = app.data.screens.reduce((total, screen) => {
      return total + screen.price;
    }, app.data.screenPrice);
  },

  // Доп. услуги (number)
  getAllServicePrices: () => {
    for (let i = 0; i < 2; i++) {
      let name;

      do {
        name = prompt(
          "Если нужен дополнительный тип услуги, то укажите какой:",
          "Админ-панель/База данных"
        );
        if (name) {
          name = name.trim();
          name = name.toLowerCase();
          name = name[0].toUpperCase() + name.substring(1);
        }
      } while (!isNaN(+name) && name !== null);

      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", 5000);
      } while (!app.isNum(price) && price !== null);
      app.data.services[`${i + 1}_${name}`] = +price;
    }

    for (const key in app.data.services) {
      app.data.allServicePrices += app.data.services[key];
    }
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

  logger: () => {
    console.log(app.data);
  },

  start: () => {
    app.startQuiz();
    // app.logger(app);
    app.logger();
  },
};

app.start();
