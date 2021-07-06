import * as d3 from "d3";

const buildPieChart = (id, rawData, selection, transition, themes, xml) => {
  const colors = [
    {hero:'Ana', color:'#718ab3'},
    {hero:'Ashe', color:'rgb(104,104,106)'},
    {hero:'Baptiste', color:'rgb(91,176,202)'},
    {hero:'Bastion', color:'#7c8f7b'},
    {hero:'Brigitte', color:'#be736e'},
    {hero:'D.Va', color:'#ed92c7'},
    {hero:'Doomfist', color:'#815049'},
    {hero:'Echo', color:'rgb(157,203,244)'},
    {hero:'Genji', color:'#97ef43'},
    {hero:'Hanzo', color:'#b9b48a'},
    {hero:'Junkrat', color:'#ecbd53'},
    {hero:'Lúcio', color:'#85c952'},
    {hero:'McCree', color:'#ae595c'},
    {hero:'Mei', color:'#6faced'},
    {hero:'Mercy', color:'#ebe8bb'},
    {hero:'Moira', color:'#803c51'},
    {hero:'Orisa', color:'#468c43'},
    {hero:'Pharah', color:'#3e7dca'},
    {hero:'Reaper', color:'#7d3e51'},
    {hero:'Reinhardt', color:'#929da3'},
    {hero:'Roadhog', color:'#b68c52'},
    {hero:'Sigma', color:'rgb(148, 159, 164)'},
    {hero:'Soldier: 76', color:'#697794'},
    {hero:'Sombra', color:'#7359ba'},
    {hero:'Symmetra', color:'#8ebccc'},
    {hero:'Torbjörn', color:'#c0726e'},
    {hero:'Tracer', color:'#d79342'},
    {hero:'Widowmaker', color:'#9e6aa8'},
    {hero:'Winston', color:'#a2a6bf'},
    {hero:'Wrecking Ball', color:'rgb(216, 144, 75)'},
    {hero:'Zarya', color:'#e77eb6'},
    {hero:'Zenyatta', color:'#ede582'},
  ]
  let longestLabel = "";
  let data = rawData.stats.byHero.map((hero, i) => {
    const label = hero.name;
    const foundStat = hero.stats.find((s) => s.name === selection);
    if (label.length > longestLabel.length) {
      longestLabel = label;
    }
    let value;
    if (foundStat) {
      value = foundStat.value;
    } else {
      value = 0;
    }

    return {
      label,
      value,
    };
  });
  data = data.filter((d) => d.value !== 0);


  const container = d3.select(`#${id}`);
  const w = parseFloat(container.style("width"));

  const h = parseFloat(container.style("height"));
  const svg = container
    .append("svg")
    .attr("id", `${id}Svg`)
    .attr("width", w)
    .attr("height", h);

  
  //const fontSize = w > h * 1.3 ? "4vh" : "1.5vw";
  const fontSize = '2vmax'
  const getBBox = (svg, text) => {
    const textSvg = svg.append("text").attr("font-size", fontSize).text(text);
    const dim = textSvg.node().getBoundingClientRect();
    textSvg.remove();
    return dim;
  };
  const bbox = getBBox(svg, longestLabel);
  //I should define global media query
  
  const spacing = w * 0.025;
  const symbolDim = bbox.height;
  const textDim = bbox.width + spacing; //+ legendSymbolWidth;
  const margin = textDim + symbolDim + spacing;
  //let margin = 0;
  //if(mediaQuery.matches) margin = 50

  //max radius that can fit in container
  //which is why values used in arc functions are fractions of it
  //to make room for labels and such to fit
  const r = Math.min(w - margin, h) / 2;

  //g
  const g = svg
    .append("g")
    .attr("transform", `translate(${(w - margin) / 2}, ${h / 2})`);

  //svg = svg.append("g").attr("transform", `translate(${w / 2}, ${h / 2})`);
  //const color = d3.schemeCategory10;
  const pie = d3.pie().value((d) => d.value);
  const arcs = pie(data);
  const transitionTime = 1500;

  const mainArc = { inner: r * 0.6, outer: r * 0.95 };
  const logoDim = (mainArc.inner * 2) / Math.sqrt(2);

  d3.xml(xml,).then((svgData) => {
    const newNode = svgData.documentElement.cloneNode(true);
    //console.log(svgData.documentElement)
    const node = g.node().appendChild(newNode);

    const svgLogo = d3
      .select(node)
      .attr("id", "svgLogo")
      .attr("y", -logoDim / 2)
      .attr("x", -logoDim / 2)
      .attr("height", logoDim)
      .attr("width", logoDim)


    if (transition) {
      svgLogo.style('opacity', 0)
      .transition().duration(transitionTime)
        .style('opacity', 1)

    }
  });

  const arc = d3.arc().innerRadius(mainArc.inner).outerRadius(mainArc.outer);

  function tweenPie(b) {
    let i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return function (t) {
      return arc(i(t));
    };
  }
  if (transition) {
    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => colors.find(c => c.hero === d.data.label).color)
      .transition()
      .ease(d3.easeElasticOut.amplitude(1).period(0.99))
      .duration(transitionTime)
      .attrTween("d", tweenPie);
  } else {
    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => colors.find(c => c.hero === d.data.label).color)
      .attr("d", arc);
  }
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([h / 2 - r * 0.9, h / 2 + r * 0.9])
    .padding(0.5);

  //could make width even square but then for longer legends, there a big space
  //between names and i think to fix that i have to recalculate the scaleBand
  //Math.min(yScale.bandwidth(), symbolDim)
  svg
    .selectAll("legendSymbol")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.label))
    .attr("x", (w - margin) / 2 + r * 0.95 + spacing)
    .attr("width", symbolDim)
    .attr("height", Math.min(yScale.bandwidth(), symbolDim))
    .attr("fill", (d, i) => colors.find(c => c.hero === d.label).color)
    .attr("stroke", "#000");

  svg
    .selectAll("legendLabels")
    .data(data)
    .enter()
    .append("text")
    .attr("y", (d) => yScale(d.label) + Math.min(yScale.bandwidth(),symbolDim))
    .attr("x", (w - margin) / 2 + r * 0.95 + symbolDim + spacing * 2)
    .attr("font-size", fontSize)
    .attr("fill", themes.tertiary)
    .text((d) => d.label);
  //https://www.d3-graph-gallery.com/graph/donut_label.html
  //kinda want to borrow this cus labels look so nice here but it has bugs
};



export default buildPieChart;
