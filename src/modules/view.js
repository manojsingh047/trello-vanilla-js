import "../styles/main.scss";
import { BOARDS, STATE_MAP, PRIOTITY_MAP } from "../store/config";
import { DEFAULT_TODOS } from "../store/todos";
import * as todosService from "../services/todos.service";
import * as dragService from "../services/drag.service";
import * as AppEventEmitter from "./mediator";
import { debounce } from "../services/debounce";
const setupView = () => {
  addCustomEvents();
  todosService.postDefaultTodos(DEFAULT_TODOS);
  const appElement = document.getElementById("app");
  appElement.innerHTML = getAppSkeleton();
  AppEventEmitter.emit(
    AppEventEmitter.EVENTS.RENDER_TODOS,
    todosService.getAllTodos()
  );
  renderForm();
  addEventListeners();
};

const addCustomEvents = () => {
  AppEventEmitter.on(
    AppEventEmitter.EVENTS.TODO_STATE_UPDATED,
    updateTodoStateDOM
  );
  AppEventEmitter.on(AppEventEmitter.EVENTS.RENDER_TODOS, renderTodos);
  AppEventEmitter.on(AppEventEmitter.EVENTS.RE_RENDER_TODOS, reRenderTodos);
  AppEventEmitter.on(AppEventEmitter.EVENTS.FILTER_TODOS, filterTodosDOM);
};

const addEventListeners = () => {
  // -- Poor assignment - to each todo
  // const todo = document.querySelectorAll(".todo");
  // for (let i = 0; i < todo.length; i++) {
  //   todo[i].addEventListener("dragstart", dragService.onDragStart);
  // }

  // -- better dragstart event assignment - not adding event handler to each todos
  //and draggable = true attribute is taking care of picking the correct element for dragging
  const boards = document.querySelectorAll(".board");
  for (let i = 0; i < boards.length; i++) {
    boards[i].addEventListener("dragstart", dragService.onDragStart);
    boards[i].addEventListener("drop", dragService.onDrop);
    boards[i].addEventListener("dragover", dragService.onDragOver);
  }

  const searchEle = document.getElementById("search-todo");
  searchEle.addEventListener("keyup", getSearchValue);
  const boardsContainerEle = document.querySelector(".boards-container");
  //Event delegation implemented
  boardsContainerEle.addEventListener("click", highlightTodosWithSamePriority);
};

//not an arrow function because arrow fns don't care about current this, they always refer to this of parent scope
let selectedTodo;
const highlightTodosWithSamePriority = function(event) {
  //Event delegation implemented
  //https://javascript.info/event-delegation

  // The method elem.closest(selector) returns the nearest ancestor that matches the selector. In our case we look for <td> on the way up from the source element.
  let todo = event.target.closest(".todo");
  console.log(event);
  if (!todo) {
    return;
  }

  // In case of nested boardsContainerEle, event.target may be a todo lying outside of the current boardContainer. So we check if that’s actually our board container.
  if (!this.contains(todo)) {
    return;
  }

  if (selectedTodo) {
    // remove the existing highlight if any
    selectedTodo.style.background = "initial";
  }
  selectedTodo = todo;
  selectedTodo.style.background =
    "linear-gradient(45deg, #7b0a0a, transparent)"; // highlight the new todo
};

const getSearchValueMain = () => {
  todosService.searchTodos(document.getElementById("search-todo").value);
};

/*Debouncing with closure */
const getSearchValue = debounce(getSearchValueMain, 500);

/*Crude debouncing */
// const getSearchValue = () => {
//   debounce(getSearchValueMain, 500);
// };

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

/**
 *
 * Poor function, takes a lot of process to re render all todos
 */
const reRenderTodos = todos => {
  const todosEle = document.querySelectorAll(".todos");
  for (let i = 0; i < todosEle.length; i++) {
    while (todosEle[i].hasChildNodes()) {
      todosEle[i].removeChild(todosEle[i].lastChild);
    }
  }
  console.log(todosEle);
  renderTodos(todos);
};

/**
 *
 * 1. looping through all todos dom nodes and filtering based on filterd nodes,
 * 2. We could just loop over all todos and filter based on dom data, that would be O(n), but the limitation is if we don't have any field rendered on dom then we can't filter on that field.
 *
 */
const filterTodosDOM = todos => {
  const todosEle = document.querySelectorAll(".todo");

  for (let i = 0; i < todosEle.length; i++) {
    todosEle[i].style.display = "none";
    for (let j = 0; j < todos.length; j++) {
      if (todos[j].id === parseInt(todosEle[i].id)) {
        todosEle[i].style.display = "block";
        break;
      }
    }
  }
};

const renderTodos = todos => {
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
  todoId.setAttribute("data-todo-id", "dummy");

  const todoTitle = document.createElement("h4");
  todoTitle.className = "todo-title";
  todoTitle.innerText = todo.title;

  const todoDesc = document.createElement("p");
  todoDesc.className = "todo-todoDesc";
  todoDesc.innerText = todo.description;

  const todoPriority = document.createElement("p");
  todoPriority.className = "todo-priority";
  todoPriority.innerText = todo.priority;

  todoNode.appendChild(todoId);
  todoNode.appendChild(todoTitle);
  todoNode.appendChild(todoDesc);
  todoNode.appendChild(todoPriority);

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
  let skeletonStr = `<header>
    <input type='text' id='search-todo' placeholder='search'>
    <h3>TRELLO CLONE VANILLA JS</h3>
    <div></div>
  </header>
   <section class="boards-container">`;

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
