import "../styles/main.scss";
import { BOARDS, STATE_MAP, PRIOTITY_MAP } from "../store/config";
import { DEFAULT_TODOS } from "../store/todos";
import * as todosService from "../services/todos.service";
import * as dragService from "../services/drag.service";
import * as AppEventEmitter from "./mediator";
const setupView = () => {
  todosService.postDefaultTodos(DEFAULT_TODOS);
  const appElement = document.getElementById("app");
  appElement.innerHTML = getAppSkeleton();
  renderDefaultTodos();
  renderForm();
  addEventListeners();
};

const addEventListeners = () => {
  const todo = document.querySelectorAll(".todo");
  for (let i = 0; i < todo.length; i++) {
    todo[i].addEventListener("dragstart", dragService.onDragStart);
  }
  const boards = document.querySelectorAll(".board");
  for (let i = 0; i < boards.length; i++) {
    boards[i].addEventListener("drop", dragService.onDrop);
    boards[i].addEventListener("dragover", dragService.onDragOver);
  }

  AppEventEmitter.on(
    AppEventEmitter.EVENTS.TODO_STATE_UPDATED,
    updateTodoStateDOM
  );
};

const updateTodoStateDOM = ({ todo, prevState, newState }) => {
  const prevBoardEle = document.querySelectorAll(
    `.board#${prevState} .todos .todo`
  );

  let todoEle;
  for (let i = 0; i < prevBoardEle.length; i++) {
    if (parseInt(prevBoardEle[i].id) === todo.id) {
      todoEle = prevBoardEle[i];
      break;
    }
  }
  todoEle.remove();
  const newBoardEle = document.querySelector(`.board#${newState} .todos`);
  newBoardEle.appendChild(todoEle);
};

const renderForm = () => {
  const boards = document.querySelectorAll(".board");
  for (let i = 0; i < boards.length; i++) {
    if (boards[i].id !== STATE_MAP.DEV) {
      continue;
    }
    const formNode = getTodoForm(boards[i].id);
    let insertBefore = null;
    for (let j = 0; j < boards[i].children.length; j++) {
      if (boards[i].children[j].className === "todos") {
        insertBefore = boards[i].children[j];
        break;
      }
    }
    boards[i].insertBefore(formNode, insertBefore);
  }
};

const renderDefaultTodos = () => {
  const todos = todosService.getAllTodos();
  todos.forEach(todo => {
    renderTodo(todo);
  });
};

const renderTodo = todo => {
  const board = getBoardNode(todo.state);
  const todoNode = createTodoNode(todo);
  board.prepend(todoNode);
};

const createTodoNode = todo => {
  const todoNode = document.createElement("div");
  todoNode.className = "todo";
  todoNode.id = todo.id;
  todoNode.draggable = true;

  const todoId = document.createElement("h4");
  todoId.className = "todo-id";
  todoId.innerText = `# ${todo.id}`;

  const todoTitle = document.createElement("h4");
  todoTitle.className = "todo-title";
  todoTitle.innerText = todo.title;

  const todoDesc = document.createElement("div");
  todoDesc.className = "todo-todoDesc";
  todoDesc.innerText = todo.description;

  todoNode.appendChild(todoId);
  todoNode.appendChild(todoTitle);
  todoNode.appendChild(todoDesc);

  return todoNode;
};

const getBoardNode = state => {
  const todoBoard = document.querySelector(`#${state}`);
  const todoBoardChilds = todoBoard.childNodes;
  for (let i = 0; i < todoBoardChilds.length; i++) {
    if (todoBoardChilds[i].className === "todos") {
      return todoBoardChilds[i];
    }
  }

  return null;
};

const getAppSkeleton = () => {
  let skeletonStr = `<header></header><section class="boards-container">`;

  const boards = BOARDS.reduce((acc, board) => {
    const defaultClass = board.isDefault ? "default" : "";
    acc += `<div id="${board.id}" class="board ${defaultClass}">
        <h3 class='board-title'>${board.title}</h3>
        <div class="todos"></div>
      </div>`;
    return acc;
  }, "");

  skeletonStr += boards;
  skeletonStr += `</section>`;
  return skeletonStr;
};

const getTodoForm = id => {
  const form = document.createElement("form");
  form.className = "todo-form";
  form.setAttribute("formBoard", id);
  form.setAttribute("action", "#");
  form.addEventListener("submit", todosService.todoFormSubmit);

  const textIp = document.createElement("input");
  textIp.setAttribute("type", "text");
  textIp.setAttribute("name", "title");
  textIp.setAttribute("placeholder", "Enter Title");
  textIp.setAttribute("required", "");
  textIp.setAttribute("minLength", 1);

  const descIp = document.createElement("input");
  descIp.setAttribute("type", "text");
  descIp.setAttribute("name", "description");
  descIp.setAttribute("placeholder", "Enter Description");
  descIp.setAttribute("required", "");
  descIp.setAttribute("minLength", 1);

  const priorityIp = document.createElement("select");
  priorityIp.setAttribute("name", "priority");
  const priorites = Object.values(PRIOTITY_MAP);
  for (let i = 0; i < priorites.length; i++) {
    let option = document.createElement("option");
    option.value = priorites[i];
    option.text = priorites[i];
    priorityIp.appendChild(option);
  }
  const submit = document.createElement("input"); //input element, Submit button
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");

  form.appendChild(textIp);
  form.appendChild(descIp);
  form.appendChild(priorityIp);
  form.appendChild(submit);

  return form;
};

export { setupView, renderTodo };
