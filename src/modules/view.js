import "../styles/main.scss";
import { BOARDS } from "../store/config";
import { DEFAULT_TODOS } from "../store/todos";
import * as todosService from "../services/todos.service";
import { create } from "domain";

const setupView = () => {
  todosService.postDefaultTodos(DEFAULT_TODOS);
  const appElement = document.getElementById("app");
  appElement.innerHTML = getAppSkeleton();
  renderDefaultTodos();
};

const renderDefaultTodos = () => {
  const todos = todosService.getAllTodos();

  todos.forEach(todo => {
    renderTodo(todo);
  });
};

const renderTodo = todo => {
  console.log(todo);
  const board = getBoardNode(todo.state);
  console.log(board);
  const todoNode = createTodoNode(todo);
  board.appendChild(todoNode);
};

const createTodoNode = todo => {
  const todoNode = document.createElement("div");
  todoNode.className = "todo";
  todo.id = todo.id;

  const todoTitle = document.createElement("div");
  todoTitle.className = "todo-title";
  todoTitle.innerText = todo.title;

  const todoDesc = document.createElement("div");
  todoDesc.className = "todo-todoDesc";
  todoDesc.innerText = todo.description;

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
  let skeletonStr = `<section class="boards-container">`;

  const boards = BOARDS.reduce((acc, board) => {
    const defaultClass = board.isDefault ? "default" : "";
    acc += `<div id="${board.id}" class="board ${defaultClass}">
      ${board.title}
        <div class="todos"></div>
      </div>`;
    return acc;
  }, "");

  skeletonStr += boards;
  skeletonStr += `</section>`;
  return skeletonStr;
};

export { setupView };
