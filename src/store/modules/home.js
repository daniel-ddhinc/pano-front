import _ from "lodash";
import { detectItem } from "@/api/item";

export const state = {
  item: {
    url: null,
    width: null,
    height: null
  },
  file: null,
  g: null,
  rect: [],
  text: [],
  detected: []
};

export const getters = {
  item(state) {
    return state.item;
  },
  file(state) {
    return state.file;
  },
  g(state) {
    return state.g;
  },
  rect(state) {
    return state.rect;
  },
  text(state) {
    return state.text;
  },
  detected(state) {
    return state.detected;
  }
};

export const mutations = {
  setItem(state, item) {
    state.item = item;
  },
  setFile(state, file) {
    state.file = file;
  },
  setG(state, g) {
    state.g = g;
  },
  setRect(state, rect) {
    state.rect = rect;
  },
  setText(state, text) {
    state.text = text;
  },
  setDetected(state, detected) {
    state.detected = detected;
  }
};

export const actions = {
  handleFileEmpty({ commit, rootState }) {
    commit("setFile", null);
    commit("setRect", []);
    commit("setText", []);
    commit("setDetected", []);
    commit("setItem", { url: null, width: null, height: null });
    commit("sidebar/setDrawer", false, { root: true });

    // sidebar active false
    rootState.sidebar.items.map(x => {
      x.active = false;
    });

    const svgPoint = document.getElementById("svgPoint");
    svgPoint && svgPoint.remove();
  },
  handleImage({ commit, dispatch, getters }, src) {
    const img = new Image();
    img.onload = () => {
      commit("setItem", {
        url: src,
        width: img.width,
        height: img.height
      });
      dispatch("dgxDetect", getters.file);
      dispatch("svg/createSVG", img, { root: true });
      commit("sidebar/setDrawer", true, { root: true });
    };
    img.src = src;
  },
  async dgxDetect({ commit, rootState }, file) {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: { output }
    } = await detectItem(formData);
    // Add name on each object
    const arr = output.map(x => x.boxs.map(p => _.extend(p, { name: x.name })));

    const cariesArr = arr[0];
    const lesionArr = arr[1];

    // plesion + caries
    const namedArray = _.union(cariesArr, lesionArr);
    commit("setDetected", namedArray);

    // caries + plesion active
    rootState.sidebar.items.map(x => {
      if (x.key === "caries" || x.key === "plesion") {
        x.active = true;
      }
    });
  },
  createSvgElements({ getters, dispatch }) {
    getters.detected.map((item, key) => {
      dispatch("svgElements", { item, key });
    });
  },
  svgElements({ getters, commit }, { item, key }) {
    if (!getters.rect[key]) {
      // draw svg, rect, text
      const svgns = "http://www.w3.org/2000/svg";
      const x = item.bbox.x - item.bbox.w / 2;
      const y = item.bbox.y - item.bbox.h / 2;
      const rect = document.createElementNS(svgns, "rect");
      const text = document.createElementNS(svgns, "text");
      const color = item.name === "caries" ? "#ff0000" : "#00ff21";
      rect.setAttribute("width", item.bbox.w);
      rect.setAttribute("height", item.bbox.h);
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("class", item.name);
      rect.setAttribute("fill", color);
      rect.setAttribute("fill-opacity", 0.5);
      text.setAttribute("fill", color);
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.setAttribute("font-size", "24px");
      text.setAttribute("class", item.name);
      text.setAttribute("font-family", "Bebas Neue, cursive");
      text.innerHTML = item.prob;
      if (getters.g) {
        getters.g.appendChild(rect);
        getters.g.appendChild(text);
        getters.rect[key] = rect;
        getters.text[key] = text;
      }
    } else {
      if (getters.rect[key].parentNode) {
        getters.rect[key].parentNode.removeChild(getters.rect[key]);
        getters.rect[key] = null;
      }
      if (getters.text[key].parentNode) {
        getters.text[key].parentNode.removeChild(getters.text[key]);
        getters.text[key] = null;
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
