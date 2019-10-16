const BOARDS = [
  {
    id: "dev",
    title: "DEVELOPMENT",
    isDefault: true
  },
  {
    id: "qa",
    title: "QA",
    isDefault: false
  },
  {
    id: "released",
    title: "RELEASED",
    isDefault: false
  }
];

const PRIOTITY_MAP = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2
};

const STATE_MAP = {
  DEV: 0,
  QA: 1,
  RELEASED: 2
};

const LOCAL_STORAGE_KEY = "trello-clone-data";

export { BOARDS, PRIOTITY_MAP, STATE_MAP, LOCAL_STORAGE_KEY };
