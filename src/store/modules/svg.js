import * as d3 from "d3";

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
  createSVG({ commit }, img) {
    const viewBox = `0 0 ${img.width} ${img.height}`;

    const svgD3 = d3
      .select(".d3")
      .append("svg")
      .attr("id", "svgPoint")
      .attr("viewBox", viewBox);

    d3.select("#svgPoint")
      .append("filter")
      .attr("id", "brightness")
      .append("feComponentTransfer")
      .attr("class", "feComp");

    d3.select(".feComp")
      .append("feFuncR")
      .attr("class", "fefunc")
      .attr("type", "linear");

    d3.select(".feComp")
      .append("feFuncG")
      .attr("class", "fefunc")
      .attr("type", "linear");

    d3.select(".feComp")
      .append("feFuncB")
      .attr("class", "fefunc")
      .attr("type", "linear");

    const image = d3
      .select("#svgPoint")
      .append("image")
      .attr("xlink:href", img.src)
      .attr("width", img.width)
      .attr("height", img.height)
      .attr("preserveAspectRatio", "none")
      .attr("filter", "url(#brightness)");

    const gD3 = d3
      .select("#svgPoint")
      .append("g")
      .attr("id", "g")
      .attr("filter", "url(#brightness)");

    const zoomed = () => {
      image.attr("transform", d3.event.transform);
      gD3.attr("transform", d3.event.transform);
    };

    const zoom = d3
      .zoom()
      .translateExtent([
        [0, 0],
        [img.width, img.height]
      ])
      .scaleExtent([1, 8])
      .on("zoom", zoomed, { passive: true });

    if (svgD3) {
      svgD3.call(zoom);
    }

    commit("home/setG", document.getElementById("g"), { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
