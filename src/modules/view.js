import "../styles/main.scss";
import { BOARDS } from "../store/config";
import { DEFAULT_TODOS } from "../store/todos";
import * as todosService from "../services/todos.service";

const setupView = () => {
  todosService.postDefaultTodos(DEFAULT_TODOS);
  const appElement = document.getElementById("app");
  appElement.innerHTML = getAppSkeleton();
  renderTodos();
};

const renderTodos = () => {
  const todos = todosService.getAllTodos();
  // const todosElements = document.querySelector(".todos");
  const todosElements = document.querySelectorAll(".board");
  console.log(todos);
  console.log("todosElements", todosElements);
  console.log("todosElements", todosElements[0].id);
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
