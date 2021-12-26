"Use strict";

const title = document.getElementsByTagName("h1")[0];
const calculateBtn = document.getElementById("start");
const defaultBtn = document.getElementById("reset");
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
    cmsPrice: 0,
    cmsPercent: 0,
    totalPrice: 0,
    rollback: 0,
    err: false,
    buttonsSwapped: false,
  },

  init: function () {
    this.addTitle();
    calculateBtn.addEventListener("click", this.checkData);
    defaultBtn.addEventListener("click", this.reset);
    addBtn.addEventListener("click", this.addScreens);
    rangeInput.addEventListener("input", this.getRollback);
    this.revealCMS();
  },

  start: function () {
    this.disableInputs();
    this.swapButtons();
    this.countScreens();
    this.addServices();
    this.getPrices();
    this.parseResults();
    this.logData();
  },

  reset: function () {
    console.log("reset: " + this);
    app.swapButtons();
    app.resetScreens();
    app.resetServices();
    app.hideCMS();
    app.resetInputs();
    app.resetData();
    app.resetRollback();
    app.parseResults();
    console.log("Сброс!");
    app.logData();
  },

  resetData: function () {
    this.data.screens = [];
    this.data.percentPriceServices = {};
    this.data.fixedPriceServices = {};
    this.data.screensCount = 0;
    this.data.screenPrice = 0;
    this.data.percentPrices = 0;
    this.data.fixedPrices = 0;
    this.data.fullPrice = 0;
    this.data.cmsPrice = 0;
    this.data.cmsPercent = 0;
    this.data.totalPrice = 0;
    this.data.rollback = 0;
    this.data.err = false;
    this.data.buttonsSwapped = false;
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  getRollback: function () {
    console.log("getRollback: " + this);
    app.data.rollback = rangeInput.value;
    rangeSpan.textContent = `${rangeInput.value}%`;
    app.getPrices();
    app.parseResults();
  },

  resetRollback: function () {
    rangeInput.value = 0;
    rangeSpan.textContent = `${rangeInput.value}%`;
  },

  parseResults: function () {
    layoutPrice.value = this.data.screenPrice;
    totalScreensCount.value = this.data.screensCount;
    totalServicesPrice.value =
      this.data.percentPrices + this.data.fixedPrices + this.data.cmsPrice;
    fullPrice.value = this.data.fullPrice;
    totalPrice.value = this.data.totalPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    const extraScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(extraScreen);
  },

  resetScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((item, index) => {
      index > 0 ? item.remove() : null;
    });
    console.log(screens[0]);
    screens[0].querySelector("select").value = "";
    screens[0].querySelector("input").value = "";
  },

  getScreensCount: function () {
    this.data.screensCount = 0;
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      this.data.screensCount += +input.value;
    });
  },

  checkData: function () {
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
      .querySelector(".main-controls__views")
      .querySelectorAll("input[type=text]")
      .forEach((input) => {
        input.setAttribute("disabled", true);
      });
    document
      .querySelector(".cms")
      .querySelector("input[type=text]")
      .setAttribute("disabled", true);
  },

  resetInputs: function () {
    document
      .querySelector(".main-controls__views")
      .querySelectorAll("input[type=text]")
      .forEach((input) => {
        input.removeAttribute("disabled");
      });
    document
      .querySelector(".cms")
      .querySelector("input[type=text]")
      .removeAttribute("disabled");
  },

  swapButtons: function () {
    if (!this.data.buttonsSwapped) {
      this.data.buttonsSwapped = true;
      addBtn.style.display = "none";
      calculateBtn.style.display = "none";
      defaultBtn.style.display = "flex";
    } else {
      this.data.buttonsSwapped = false;
      addBtn.style.display = "flex";
      calculateBtn.style.display = "flex";
      defaultBtn.style.display = "none";
    }
  },

  hideCMS: function () {
    const cmsCheckbox = document.getElementById("cms-open");
    const cms = document.querySelector(".cms");
    const select = document.getElementById("cms-select");
    cmsCheckbox.checked = false;
    cms.querySelector(".hidden-cms-variants").style.display = "none";
    cms.querySelector(".main-controls__input").style.display = "none";
    cms.querySelector("input[type=text]").value = "";
    select.value = "";
  },

  revealCMS: function () {
    const cms = document.querySelector(".cms");
    const select = document.getElementById("cms-select");
    const CMSinput = cms.querySelector(".main-controls__input");
    cms.querySelector("input[type=checkbox]").addEventListener("change", () => {
      if (cms.querySelector("input[type=checkbox]").checked) {
        cms.querySelector(".hidden-cms-variants").style.display = "flex";
        select.addEventListener("change", () => {
          if (select.options[select.selectedIndex].value === "other") {
            CMSinput.style.display = "flex";
            CMSinput.addEventListener("change", function (e) {
              app.data.cmsPercent = +e.target.value;
            });
          } else if (!isNaN(select.options[select.selectedIndex].value)) {
            app.data.cmsPercent = +select.options[select.selectedIndex].value;
          } else {
            CMSinput.style.display = "none";
          }
        });
      } else {
        cms.querySelector(".hidden-cms-variants").style.display = "none";
        CMSinput.style.display = "none";
        cms.querySelector("input[type=text]").value = "";
      }
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

  resetServices: function () {
    percentPriceItems.forEach((item) => {
      item.querySelector("input[type=checkbox]").checked = false;
    });
    fixedPriceItems.forEach((item) => {
      item.querySelector("input[type=checkbox]").checked = false;
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

    // Стоимость интеграции CMS
    this.data.cmsPrice = (this.data.fullPrice * this.data.cmsPercent) / 100;

    // Коррекция полной стоимости
    this.data.fullPrice += this.data.cmsPrice;

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
