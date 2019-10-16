import { todo } from "../model/todo";
import { PRIOTITY_MAP, STATE_MAP } from "./config";

export const DEFAULT_TODOS = [
  new todo(
    null,
    "title1",
    "this is description1",
    STATE_MAP.DEV,
    PRIOTITY_MAP.LOW
  ),
  new todo(
    null,
    "title2",
    "this is description2",
    STATE_MAP.QA,
    PRIOTITY_MAP.LOW
  ),
  new todo(
    null,
    "title3",
    "this is description3",
    STATE_MAP.RELEASED,
    PRIOTITY_MAP.HIGH
  ),
  new todo(
    null,
    "title4",
    "this is description4",
    STATE_MAP.QA,
    PRIOTITY_MAP.MEDIUM
  ),
  new todo(
    null,
    "title5",
    "this is description5",
    STATE_MAP.DEV,
    PRIOTITY_MAP.MEDIUM
  )
];
