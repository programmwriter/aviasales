import { TOGGLE_TAB } from "../actions";

const initState = [
  {
    label: "САМЫЙ ДЕШЕВЫЙ",
    id: 1,
    active: true,
  },
  {
    label: "САМЫЙ БЫСТРЫЙ",
    id: 2,
    active: false,
  },
];

const toggleTab = (tabs, id) => {
  const toggledTabs = tabs.map((tab) => {
    return tab.id === id ? { ...tab, active: true } : { ...tab, active: false };
  });

  return toggledTabs;
};

const tabsReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_TAB: {
      const tabs = toggleTab(state, action.id);
      return [...state, tabs];
    }
    default:
      return state;
  }
};

export default tabsReducer;
