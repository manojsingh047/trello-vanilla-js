import * as localStorageService from "./storage.service";
import { LOCAL_STORAGE_KEY, STATE_MAP, PRIOTITY_MAP } from "../store/config";
import { todo } from "../model/todo";
import { renderTodo } from "../modules/view";

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
  todos.forEach((todo, index) => {
    todo.id = index + 1;
  });
  localStorageService.postData(JSON.stringify(todos));
};

const generateTodoId = todos => {
  return todos.length + 1;
};

const postTodo = todo => {
  const todos = [...getAllTodos()];
  todo.id = generateTodoId(todos);
  todos.push(todo);
  localStorageService.postData(JSON.stringify(todos));

  renderTodo(todo);
};

const getTodoObj = ({ title, description, state, priority = 1 }) => {
  return new todo(null, title, description, state, priority);
};

const clearAllTodos = () => {
  localStorageService.clearAll();
};

const todoFormSubmit = event => {
  event.preventDefault();
  const formBoard = event.srcElement.getAttribute("formBoard") || STATE_MAP.DEV;
  let title = "";
  let desc = "";
  let priority = "";

  for (let i = 0; i < event.srcElement.length; i++) {
    if (event.srcElement[i].name === "title") {
      title = event.srcElement[i].value.trim() || "";
    }
    if (event.srcElement[i].name === "description") {
      desc = event.srcElement[i].value.trim() || "";
    }
    if (event.srcElement[i].name === "priority") {
      priority = event.srcElement[i].value.trim() || "";
    }
  }

  if (title.length === 0 || desc.length === 0 || priority.length === 0) {
    console.log("Mandatory data missing.");
    return;
  }
  const todo = getTodoObj({
    title: title,
    description: desc,
    state: formBoard,
    priority: priority
  });
  console.log("todo", todo);

  postTodo(todo);
};

const updateTodoState = ({ id, newState }) => {
  const todos = getAllTodos().map(todo => {
    if (todo.id === id) {
      todo.state = newState;
    }
    return todo;
  });
  localStorageService.postData(JSON.stringify(todos));
};

export {
  getAllTodos,
  getTodo,
  postDefaultTodos,
  todoFormSubmit,
  updateTodoState
};
