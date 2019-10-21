import * as todoService from "./todos.service";

export const onDragStart = event => {
  const id = event.target.id;
  event.dataTransfer.setData("todoId", id);
};
export const onDragOver = event => {
  event.preventDefault();
};
export const onDrop = event => {
  event.preventDefault();
  const id = event.dataTransfer.getData("todoId");
  const newState = event.currentTarget.id;
  todoService.updateTodoState({
    id: parseInt(id),
    newState: newState
  });
};
