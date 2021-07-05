import * as d3 from "d3";
const buildLineChart = (id, rawData, selection, transition, themes) => {
  //const selection = 'All Damage Done'
  const mediaQuery = window.matchMedia("(max-width: 850px)");
  const data = rawData.map((m) => {
    //const date = m.startTime.split(' ')[0]
    const ymd = m.startTime.split(" ")[0].split("-");
    let date;
    date = `${ymd[1]}/${ymd[2]}/${ymd[0]}`;

    if (mediaQuery.matches) {
      //make date in shorter format for mobile
      date = `${parseInt(ymd[1])}/${parseInt(ymd[2])}/${ymd[0].slice(2, 4)}`;
    }
    const statValue = m.stats.all.find((s) => s.name === selection).value;
    return { date, statValue: parseInt(statValue, 10) };
  });
  //console.log(data)
  //const rawData =
  //const data = [5, 3, 1, 4, 5, 10, 30, 13, 8, 9];
  const transitionTime = 1000;
  const transitionEase = d3.easeQuadOut;

  //idea for adding players to line chart for comparison
  //need to reevaluate yscale max and transition y axis to grow if needed
  //then do cool path offset animation to bring it in
  const container = d3.select(`#${id}`);
  //implement animated, over time chart starting with range start then
  //adding dates every second or so until range end
  const svg = container
    .append("svg")
    .attr("id", `${id}Svg`)
    //.attr("viewBox", `0 0 ${w} ${h}`)
    .attr("width", "100%")
    .attr("height", "100%");

  const w = parseFloat(d3.select(`#${id}Svg`).style("width"));

  const h = parseFloat(d3.select(`#${id}Svg`).style("height"));

  const maxValue = d3.max(data, (d) => d.statValue);
  const fontSize = '1.5vmin'
  
  const getBBox = (svg,text) => {
    const textSvg = svg
        .append('text')
        .attr('font-size', fontSize)
        .text(text)
    const dim = textSvg.node().getBoundingClientRect()
    textSvg.remove()
    return dim
}
const tickDim = getBBox(svg, data[0].date)
  // const margin = {
  //   left: maxValue > 1000 ? 50 : 35,
  //   right: 25,
  //   top: 10,
  //   bottom: h*0.1,
  // };
  //console.log(tickDim)
  const margin = {
    left: w*0.05,
    right: (w*0.01)+tickDim.width/2,
    top: tickDim.height,
    bottom: tickDim.height*2
  }
  let xScale = d3
    .scalePoint()
    .domain(data.map((d) => d.date))
    .range([margin.left, w - margin.right]);
  let yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([h - margin.bottom, margin.top])
    .nice();

  // let xScale = d3
  //   .scaleLinear()
  //   .domain([0, data.length - 1])
  //   .range([margin.left, w - margin.right]);
  // let yScale = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(data, (d) => d)])
  //   .range([h - margin.bottom, margin.top]);
  //console.log(xScale("2021-04-17 22:45:31"))
  const line = d3
    .line()
    .x((d, i) => xScale(d.date))
    .y((d, i) => yScale(d.statValue));
  let xAxis = svg
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", `translate(${0}, ${h - margin.bottom})`)
    .call(d3.axisBottom(xScale));
  
    xAxis.selectAll('path')
    .attr('stroke', themes.tertiary)
    xAxis.selectAll('line')
    .attr('stroke', themes.tertiary)
    xAxis.selectAll('text')
    .attr('color', themes.tertiary)

  let yAxis = svg
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(d3.axisLeft(yScale));

    yAxis.selectAll('path')
    .attr('stroke', themes.tertiary)
    yAxis.selectAll('line')
    .attr('stroke', themes.tertiary)
    yAxis.selectAll('text')
    .attr('color', themes.tertiary)

  //make line color, team color in the future
  let path = svg
    .append("path")
    .attr("id", "path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", themes.secondary)
    .attr("stroke-width", "1")
    .attr("d", line);
  const totalLength = path.node().getTotalLength();
  if (transition) {
    xAxis
      .attr("opacity", 0)
      .transition()
      .duration(transitionTime)
      .attr("opacity", 1);
    yAxis
      .attr("opacity", 0)
      .transition()
      .duration(transitionTime)
      .attr("opacity", 1);
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(transitionTime)
      .ease(transitionEase)
      .attr("stroke-dashoffset", 0);
  }
  svg.selectAll('text')
    .attr('font-size', fontSize)
};
export default buildLineChart;
