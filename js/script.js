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
    err: false,
  },

  init: function () {
    this.addTitle();
    calculateBtn.addEventListener("click", this.checkData);
    addBtn.addEventListener("click", this.addScreens);
    rangeInput.addEventListener("input", this.getRollback);
  },

  start: function () {
    this.countScreens();
    this.addServices();
    this.getPrices();
    this.parseResults();
    this.logData();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  getRollback: function () {
    this.data.rollback = rangeInput.value;
    rangeSpan.textContent = `${rangeInput.value}%`;
    this.getPrices();
    this.parseResults();
  },

  parseResults: function () {
    // console.log("Вывод результатов расчетов");
    layoutPrice.value = this.data.screenPrice;
    totalScreensCount.value = this.data.screensCount;
    totalServicesPrice.value = this.data.percentPrices + this.data.fixedPrices;
    fullPrice.value = this.data.fullPrice;
    totalPrice.value = this.data.totalPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    const extraScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(extraScreen);
  },

  getScreensCount: function () {
    this.data.screensCount = 0;
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      this.data.screensCount += +input.value;
    });
  },

  checkData: function () {
    app.disableInputs();
    app.data.err = false;
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value === "" || input.value === "") {
        app.data.err = true;
      }
    });
    !app.data.err ? app.start() : alert("Заполните поля!");
  },

  disableInputs: function () {
    document
      .querySelector(".main-controls")
      .querySelectorAll("input[type=text]")
      .forEach((input) => {
        input.setAttribute("disabled", true);
      });
  },

  countScreens: function () {
    this.data.screens = [];
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const name = select.options[select.selectedIndex].textContent;

      this.data.screens.push({
        id: index,
        name,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
    this.getScreensCount();
  },

  addServices: function () {
    percentPriceItems.forEach((item) => {
      if (item.querySelector("input[type=checkbox]").checked) {
        this.data.percentPriceServices[
          item.querySelector("label").textContent
        ] = +item.querySelector("input[type=text]").value;
      }
    });
    fixedPriceItems.forEach((item) => {
      if (item.querySelector("input[type=checkbox]").checked) {
        this.data.fixedPriceServices[item.querySelector("label").textContent] =
          +item.querySelector("input[type=text]").value;
      }
    });
  },

  // Стоимость работы (number)
  getPrices: function () {
    this.data.screenPrice = this.data.screens.reduce((total, screen) => {
      return total + screen.price;
    }, 0);

    this.data.fixedPrices = 0;
    for (let key in this.data.fixedPriceServices) {
      this.data.fixedPrices += +this.data.fixedPriceServices[key];
    }

    this.data.percentPrices = 0;
    for (let key in this.data.percentPriceServices) {
      this.data.percentPrices +=
        (+this.data.percentPriceServices[key] * this.data.screenPrice) / 100;
    }

    // Полная стоимость
    this.data.fullPrice =
      this.data.screenPrice + this.data.percentPrices + this.data.fixedPrices;

    // Cтоимость за вычетом отката посреднику
    this.data.totalPrice = Math.ceil(
      this.data.fullPrice - (this.data.fullPrice * this.data.rollback) / 100
    );
  },

  logData: function () {
    console.log(this.data);
  },
};

app.init();
