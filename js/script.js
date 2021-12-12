"Use strict";

const title = document.getElementsByTagName("h1")[0];
const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const defaultBtn = document.getElementsByClassName("handler_btn")[1];
const addBtn = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector(".rollback ").querySelector("input");
const rangeSpan = document.querySelector(".rollback ").querySelector("span ");

const inputs = document.getElementsByClassName("total-input");
const total = inputs[0];
const totalCount = inputs[1];
const totalCountOther = inputs[2];
const totalFullCount = inputs[3];
const totalCountRollback = inputs[4];

let screens = document.querySelectorAll(".screen");

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

  // Старт ввода данных
  // start: () => {
  //   app.getScreenPrice();
  //   app.getAllServicePrices();
  //   app.getFullPrice();
  //   app.getServicePercentPrices(app.data.fullPrice, app.data.rollback);
  //   app.getDiscountInfo(app.data.fullPrice);
  // },

  init: () => {
    app.addTitle();
    calculateBtn.addEventListener("click", app.start);
    addBtn.addEventListener("click", app.addScreens);

    app.logData();
  },

  start: () => {
    app.countScreens();
  },

  addTitle: () => {
    document.title = title.textContent;
  },

  addScreens: () => {
    const extraScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(extraScreen);
  },

  countScreens: () => {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const name = select.options[select.selectedIndex].textContent;

      app.data.screens.push({
        id: index,
        name,
        price: +select.value * +input.value,
      });
    });
    console.log(app.data.screens);
  },

  // Проверка на число (boolean)
  isNum: (num) => {
    return (
      !isNaN(parseFloat(num)) && isFinite(num) && !String(num).includes(" ")
    );
  },

  // Стоимость работы (number)
  getScreenPrice: () => {
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

  logData: () => {
    console.log(app.data);
  },
};

app.init();
