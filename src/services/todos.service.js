import * as localStorageService from "./storage.service";
import { LOCAL_STORAGE_KEY } from "../store/config";

const getAllTodos = () => {
  const storageData = window.localStorage.getItem(LOCAL_STORAGE_KEY) || "";
  return storageData.length > 0 ? JSON.parse(storageData) : [];
};

const getTodo = id => {};

const postDefaultTodos = todos => {
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

export { getAllTodos, getTodo, postDefaultTodos };
