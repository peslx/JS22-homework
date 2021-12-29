"use strict";

const greeting = document.querySelector(".greeting");
const timeWeek = document.querySelector(".time-week");
const timeCurrent = document.querySelector(".time-current");
const timeToNewYear = document.querySelector(".time-new-year");
const weekDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const getTimeParams = (deadline) => {
  let stopDate = new Date(deadline).getTime();
  let realTime = new Date();
  let remTime = Math.floor((stopDate - realTime.getTime()) / 1000);
  let days = Math.floor(remTime / 60 / 60 / 24);
  let time = realTime.toLocaleTimeString("en");
  let hours = realTime.getHours();
  let minutes = realTime.getMinutes();
  let seconds = realTime.getSeconds();
  let week = realTime.getDay();
  return { week, days, time, hours, minutes, seconds, realTime };
};

const runTimer = () => {
  let current = getTimeParams("01 january 2022");

  if (current.hours >= 18) {
    greeting.textContent = "Добрый вечер!";
  } else if (current.hours >= 23 && current.hours <= 4) {
    greeting.textContent = "Доброй ночи!";
  } else if (current.hours >= 5 && current.hours <= 12) {
    greeting.textContent = "Доброе утро!";
  } else {
    greeting.textContent = "Добрый день!";
  }

  timeWeek.textContent = `Сегодня: ${weekDays[current.week]}`;
  timeCurrent.textContent = `Текущее время: ${current.time}`;
  timeToNewYear.textContent = `До нового года осталось: ${current.days} дней`;
};
runTimer();
setInterval(runTimer, 1000);
