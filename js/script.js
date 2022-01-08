// <-- Начало блока объявления
const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  // Объявлена ф-ция 'filterByType', на входе 2 параметра: тип данных, массив данных; возврат: отфильтрованный массив по "типу" данных

  hideAllResponseBlocks = () => {
    // Объявлена ф-ция 'hideAllResponseBlocks'
    const responseBlocksArray = Array.from(
      // Внутри объявлена константа содержащая массив/коллекцию HTML c блоками-сообщениями-ответами
      document.querySelectorAll("div.dialog__response-block")
    );
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
    // Перебором элементов в массиве повешано свойство display=none скрывающее все элементы
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // Объявлена ф-ция 'showResponseBlock' на вход 3 параметра: селектор нужного блокаб текст сообщения внутри негоб идентификатор блока
    hideAllResponseBlocks();
    // Сокрытие всех информационных блоков
    document.querySelector(blockSelector).style.display = "block";
    // Показ нужного блока
    if (spanSelector) {
      // если передан селектор-идентификатор
      document.querySelector(spanSelector).textContent = msgText;
      //- вписать в блок сообщение
    }
  },
  showError = (msgText) =>
    // Объявлена ф-ция 'showError' на вход 1 параметр: текст сообщения об ошибке
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  // Вызов функции отображающей нужный блок

  showResults = (msgText) =>
    // Объявлена ф-ция 'showResults' на вход 1 параметр: текст сообщения с результатми фильтрации
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  // Вызов функции отображающей нужный блок

  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  // Объявлена ф-ция 'showNoResults' без параметров, вызывает функцию показвающую блок в случае с отсутствием результатов

  tryFilterByType = (type, values) => {
    // Объявлена ф-ция 'tryFilterByType' 2 параметра тип данных и значения
    try {
      // начало блока try-catch
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      //   объявление константы в которую сохраняется результат вызова метода 'eval'
      //   который принимает и исполняет текст кода в который переданы
      //   функция из начала модуля и переданные в нее значения 'type' и 'values'
      //   к результату выполнения функции (МАССИВУ отфильтрованных значений),
      //   применяется метод 'join' образующий из массива строку
      const alertMsg = valuesArray.length
        ? //   если строка не пустая, что проверяется через наличе ее длины
          `Данные с типом ${type}: ${valuesArray}`
        : // в константу alertMsg сохраняется строка с type иvaluesArray
          `Отсутствуют данные типа ${type}`;
      // в противном случае выводится сообщение-ошибка
      showResults(alertMsg);
      //   показывает нужный блок с текстом полученным выше
    } catch (e) {
      showError(`Ошибка: ${e}`);
      //   в случае ошибки выводит блок-ошибку
    }
  };

// Конец блока объявления -->

const filterButton = document.querySelector("#filter-btn");
// получена кнопка-тригер

filterButton.addEventListener("click", (e) => {
  // на кнопку вешается слушатель
  const typeInput = document.querySelector("#type");
  // получен инпут-типов данных
  const dataInput = document.querySelector("#data");
  // получен инпут-текста, содержащего данные

  if (dataInput.value === "") {
    //   проверка на введенные данные
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    // кастомное сообщение о невалидности данных в инпуте
    showNoResults();
    // вывод сообщения-блока с отсуствтием данных для вывода
  } else {
    // в противном случае
    dataInput.setCustomValidity("");
    // кастомное сообщение о невалидности данных в инпуте стирается
    e.preventDefault();
    // отмена стандартного поведения при клике на кнопку filterButton
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
    // вызов функции tryFilterByType, параметры обрабатываются методом trim чтобы отсечь от получаемой строки пробелы
  }
});
