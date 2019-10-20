import * as todoService from "./todos.service";

export const onDragStart = event => {
  // console.log(event);
  const id = event.target.id;
  event.dataTransfer.setData("todoId", id);
};
export const onDragOver = event => {
  event.preventDefault();
  // console.log("onDragOver...");
};
export const onDrop = event => {
  event.preventDefault();
  const id = event.dataTransfer.getData("todoId");
  // console.log("event", event);
  const newState = event.target.id;
  todoService.updateTodoState({
    id: parseInt(id),
    newState: newState
  });

  // console.log("onDrop...");
};
