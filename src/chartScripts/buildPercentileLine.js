import * as d3 from 'd3'
const buildPercentileLine = (id, percentile) => {

    const data = [1,3,4,5,10]
    const getPercentile = (arr, p) => {
        const index = Math.round(p*arr.length)
        return data[index-1]
    }
    console.log(getPercentile(data, 0.90))

    const container = d3.select(`#${id}`);
    
    const svg = container
      .append("svg")
      .attr("id", `${id}Svg`)
      .attr("width", "100%")
      .attr("height", "100%");

    const w = parseInt(d3.select(`#${id}Svg`).style("width"));

    const h = parseInt(d3.select(`#${id}Svg`).style("height"));

    const r = w*0.015//Math.min(w, h) * 0.5

    const margin = { left:20, right: 20, top: 20, bottom: 20 };

    let xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.left, w-margin.right])
    
    
    let xAxis = svg
        .append("g")
        .attr("id", "xAxisPercentile")
        .attr("transform", `translate(${0}, ${margin.top})`)
        .call(d3.axisBottom(xScale).tickValues([0, 25, 50, 75, 100]).tickFormat(d => `${d}%`));
    svg.append('circle')
        .attr('cx', xScale(percentile*100))
        .attr('cy', margin.top)
        .attr('r', r)
        .attr('fill', '#8bc')
}
export default buildPercentileLine;