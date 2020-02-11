export const state = {
  drawer: false,
  activeChildItem: null,
  activeParentItem: null,
  color: null,
  items: [
    {
      key: "caries",
      title: "Caries",
      icon: "mdi-pencil",
      active: false
    },
    {
      key: "plesion",
      title: "PLesion",
      icon: "mdi-tooth-outline",
      active: false
    },
    {
      key: "pen",
      title: "Pen",
      icon: "mdi-pencil",
      active: false,
      children: [
        {
          key: "palette",
          title: "Palette",
          icon: "mdi-palette",
          active: false,
          value: "#000"
        }
      ]
    },
    {
      key: "measure",
      title: "Measure",
      icon: "mdi-ruler",
      active: false,
      children: [
        {
          key: "ruler",
          title: "Ruler",
          icon: "mdi-ruler",
          active: false
        },
        {
          key: "line",
          title: "Line",
          icon: "mdi-chart-timeline-variant",
          active: false
        },
        {
          key: "angle",
          title: "Angle",
          icon: "mdi-angle-acute",
          active: false
        }
      ]
    },
    {
      key: "brightness",
      title: "Bright",
      icon: "mdi-brightness-7",
      active: false,
      small: true
    },
    {
      key: "threshhold",
      title: "Threshold",
      icon: "mdi-target-account",
      active: false,
      small: true
    },
    {
      key: "opacity",
      title: "Opacity",
      icon: "mdi-opacity",
      active: false,
      small: true
    },
    {
      key: "clear",
      title: "Clear",
      icon: "mdi-autorenew",
      small: true
    }
  ]
};

export const getters = {
  drawer(state) {
    return state.drawer;
  },
  items(state) {
    return state.items;
  },
  activeChildItem(state) {
    return state.activeChildItem;
  },
  activeParentItem(state) {
    return state.activeParentItem;
  },
  color(state) {
    return state.color;
  }
};

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer;
  },
  setItems(state, items) {
    state.items = items;
  },
  setActiveChildItem(state, activeChildItem) {
    state.activeChildItem = activeChildItem;
  },
  setActiveParentItem(state, activeParentItem) {
    state.activeParentItem = activeParentItem;
  },
  setColor(state, color) {
    state.color = color;
  }
};

export const actions = {
  handleClickItem({ getters, commit, dispatch }, { item }) {
    // 자식이 있는 아이템은 부모 아이템이 선택된 아이템만 활성화
    getters.items
      .filter(x => item !== x && x.children)
      .forEach(x => (x.active = false));
    // 선택한 부모 아이템의 자식 아이템이아닌 다른 부모의 자식 아이템 전체 비활성화
    if (item.children) {
      commit("setActiveParentItem", item);
      getters.items
        .filter(x => x === getters.activeParentItem)[0]
        .children.forEach(x => (x.active = false));
    }
    // active toggle
    item.active = !item.active;
    // click event handler
    dispatch(`${item.key}Handler`);
  },
  handleClickChild({ getters, commit }, { child }) {
    // 자식 아이템 중 하나 선택 시 나머지 형제 비활성화
    getters.items.forEach(item => {
      item.children &&
        item.children.forEach(x => {
          x.active = false;
        });
    });
    // active toggle
    child.active = !child.active;
    commit("setActiveChildItem", child.key);
  },
  handleClickClear() {},
  updateColor({ commit }) {
    commit("setActiveChildItem", null);
  },
  cariesHandler({ getters, rootState }) {
    getters.items.forEach(x => {
      if (x.key === "caries") {
        rootState.home.rect.forEach((y, index) => {
          if (y.getAttribute("class") === "caries") {
            y.classList.add("d-none");
            rootState.home.text[index].classList.add("d-none");
          }
        });
      }
    });
  },
  plesionHandler({ getters, rootState }) {
    getters.items.forEach(x => {
      if (x.key === "plesion") {
        rootState.home.rect.forEach((y, index) => {
          if (y.getAttribute("class") === "plesion") {
            y.classList.add("d-none");
            rootState.home.text[index].classList.add("d-none");
          }
        });
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
