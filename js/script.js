"Use strict";

const title = document.getElementsByTagName("h1")[0];
const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const defaultBtn = document.getElementsByClassName("handler_btn")[1];
const addBtn = document.querySelector(".screen-btn");
const percentPriceItems = document.querySelectorAll(".other-items.percent");
const fixedPriceItems = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector(".rollback ").querySelector("input");
const rangeSpan = document.querySelector(".rollback ").querySelector("span ");

const inputs = document.getElementsByClassName("total-input");
const layoutPrice = inputs[0];
const totalScreensCount = inputs[1];
const totalServicesPrice = inputs[2];
const fullPrice = inputs[3];
const totalPrice = inputs[4];

let screens = document.querySelectorAll(".screen");

const app = {
  data: {
    screens: [],
    percentPriceServices: {},
    fixedPriceServices: {},
    screensCount: 0,
    screenPrice: 0,
    percentPrices: 0,
    fixedPrices: 0,
    fullPrice: 0,
    totalPrice: 0,
    rollback: 0,
  },

  init: () => {
    app.addTitle();
    calculateBtn.addEventListener("click", app.start);
    addBtn.addEventListener("click", app.addScreens);
    rangeInput.addEventListener("input", app.getRollback);
  },

  start: () => {
    app.countScreens();

    app.addServices();
    app.getPrices();
    app.parseResults();
    app.logData();
  },

  addTitle: () => {
    document.title = title.textContent;
  },

  getRollback: () => {
    app.data.rollback = rangeInput.value;
    rangeSpan.textContent = `${rangeInput.value}%`;
    app.getPrices();
    app.parseResults();
  },

  parseResults: () => {
    // console.log("Вывод результатов расчетов");
    layoutPrice.value = app.data.screenPrice;
    totalScreensCount.value = app.data.screensCount;
    totalServicesPrice.value = app.data.percentPrices + app.data.fixedPrices;
    fullPrice.value = app.data.fullPrice;
    totalPrice.value = app.data.totalPrice;
  },

  addScreens: () => {
    screens = document.querySelectorAll(".screen");
    const extraScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(extraScreen);
  },

  getScreensCount: () => {
    app.data.screensCount = 0;
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      app.data.screensCount += +input.value;
    });
  },

  countScreens: () => {
    app.data.screens = [];
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const name = select.options[select.selectedIndex].textContent;

      app.data.screens.push({
        id: index,
        name,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
    app.getScreensCount();
  },

  addServices: () => {
    percentPriceItems.forEach((item) => {
      if (item.querySelector("input[type=checkbox]").checked) {
        app.data.percentPriceServices[item.querySelector("label").textContent] =
          +item.querySelector("input[type=text]").value;
      }
    });
    fixedPriceItems.forEach((item) => {
      if (item.querySelector("input[type=checkbox]").checked) {
        app.data.fixedPriceServices[item.querySelector("label").textContent] =
          +item.querySelector("input[type=text]").value;
      }
    });
  },

  // Стоимость работы (number)
  getPrices: () => {
    app.data.screenPrice = app.data.screens.reduce((total, screen) => {
      return total + screen.price;
    }, 0);

    app.data.fixedPrices = 0;
    for (let key in app.data.fixedPriceServices) {
      app.data.fixedPrices += +app.data.fixedPriceServices[key];
    }

    app.data.percentPrices = 0;
    for (let key in app.data.percentPriceServices) {
      app.data.percentPrices +=
        (+app.data.percentPriceServices[key] * app.data.screenPrice) / 100;
    }

    // Полная стоимость
    app.data.fullPrice =
      app.data.screenPrice + app.data.percentPrices + app.data.fixedPrices;

    // Cтоимость за вычетом отката посреднику
    app.data.totalPrice = Math.ceil(
      app.data.fullPrice - (app.data.fullPrice * app.data.rollback) / 100
    );
  },

  logData: () => {
    console.log(app.data);
  },
};

app.init();
