const STATE_MAP = {
  DEV: "DEV",
  QA: "QA",
  RELEASED: "RELEASED"
};

const BOARDS = [
  {
    id: STATE_MAP.DEV,
    title: "DEVELOPMENT",
    isDefault: true
  },
  {
    id: STATE_MAP.QA,
    title: "QA",
    isDefault: false
  },
  {
    id: STATE_MAP.RELEASED,
    title: "RELEASED",
    isDefault: false
  }
];

const PRIOTITY_MAP = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH"
};

const LOCAL_STORAGE_KEY = "trello-clone-data";

export { BOARDS, PRIOTITY_MAP, STATE_MAP, LOCAL_STORAGE_KEY };
