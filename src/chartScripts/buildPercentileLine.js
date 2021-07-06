import * as d3 from "d3";


const buildPercentileLine = (id, percentile, themes, transition = true, lastPercentile=0) => {
  const container = d3.select(`#${id}`);
  const w = parseFloat(container.style("width"));

  const h = parseFloat(container.style("height"));
  const svg = container
    .append("svg")
    .attr("id", `${id}Svg`)
    .attr("width", w)
    .attr("height", h);

  

  const r = w * 0.015; //Math.min(w, h) * 0.5

  const margin = { left: w*0.05, right: w*0.05, top: r, bottom:  100};

  let xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, w - margin.right]);

  let xAxis = svg
    .append("g")
    .attr("id", "xAxisPercentile")
    .attr("transform", `translate(${0}, ${margin.top})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickValues([0, 25, 50, 75, 100])
        .tickFormat((d) => `${d}%`)
    );
  const point = svg
    .append("circle")
    .attr('id', 'percentilePoint')
    .attr("cx", xScale(percentile * 100))
    .attr("cy", margin.top)
    .attr("r", r)
    .attr("fill", themes.secondary);

    if(transition){
      point.attr('cx', 0)
      .transition().duration(1000)
      .attr('cx', xScale(percentile * 100))

      xAxis.attr('opacity', 0)
      .transition().duration(1000)
      .attr('opacity', 1)
    }
      const fontSize = (w>h)?'2vh':'2vw'
  svg.selectAll('text')
    .attr('font-size', fontSize)
};

export const changePercentile = (id, newPercentile) => {
  const time = 1000;
  const w = parseFloat(d3.select(`#${id}Svg`).style("width"));


  const r = w * 0.015; 

  const margin = { left: w*0.05, right: w*0.05, top: r, bottom:  100};
  const xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, w - margin.right]);
  d3.select(`#percentilePoint`)
    .transition().duration(time)
    .attr("cx", xScale(newPercentile * 100))
}

export default buildPercentileLine;
