import * as localStorageService from "./storage.service";
import { LOCAL_STORAGE_KEY, STATE_MAP } from "../store/config";

const getAllTodos = () => {
  const storageData = window.localStorage.getItem(LOCAL_STORAGE_KEY) || "";
  return storageData.length > 0 ? JSON.parse(storageData) : [];
};

const getTodo = id => {};

const postDefaultTodos = todos => {
  // localStorageService.clearAll();
  if (getAllTodos().length > 0) {
    return;
  }
  localStorageService.initStorageData();
  todos.forEach(todo => {
    postTodo(todo);
  });
};

const postTodo = todo => {
  const todos = getAllTodos();
  todo.id = todos.length + 1;
  todos.push(todo);

  localStorageService.postData(JSON.stringify(todos));
};

const clearAllTodos = () => {
  localStorageService.clearAll();
};

const todoFormSubmit = event => {
  event.preventDefault();
  const formBoard = event.srcElement.getAttribute("formBoard") || STATE_MAP.DEV;
  let title = "";
  let desc = "";

  for (let i = 0; i < event.srcElement.length; i++) {
    if (event.srcElement[i].name === "title") {
      title = event.srcElement[i].value.trim() || "";
    }
    if (event.srcElement[i].name === "description") {
      desc = event.srcElement[i].value.trim() || "";
    }
  }

  if (title.length === 0 || desc.length === 0) {
    console.log("Mandatory data missing.");
    return;
  }
  console.log(event);
  console.log(title);
  console.log(desc);
};

export { getAllTodos, getTodo, postDefaultTodos, todoFormSubmit };
