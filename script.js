"use strict";

const getData = (getUrl) => {
  return fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Получено из 'getData()': ", data);
      return data;
    })
    .catch((error) => console.log("Ошибка выполнения запроса => " + error));
};

const sendData = (data, url) => {
  console.log("Отправлено из 'sendData()' на сервер: ", data);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Получено от сервера: ", result);
    })
    .catch((error) => console.log("Ошибка выполнения запроса => " + error));
};

// "./db.json"
// "https://jsonplaceholder.typicode.com/posts"

getData("./db.json").then((data) =>
  sendData(data, "https://jsonplaceholder.typicode.com/posts")
);
