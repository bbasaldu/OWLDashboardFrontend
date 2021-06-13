import * as d3 from 'd3'
const buildPieChart = (id, rawData, selection, transition=true) => {
    const color = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    let data = rawData.stats.byHero.map((hero, i) => {
        const label = hero.name
        const foundStat = hero.stats.find(s => s.name === selection)
        let value
        if(foundStat){
          value = foundStat.value
        } else{
          
          value = 0
        }
        

        return {
            label,
            value
        }
    })
    data = data.filter(d => d.value !== 0)
    //console.log(data)
    
    const container = d3.select(`#${id}`);
    let svg = container
      .append("svg")
      .attr("id", `${id}Svg`)
      //.attr("viewBox", `0 0 ${w} ${h}`)
      .attr("width", "100%")
      .attr("height", "100%");

    const w = parseInt(d3.select(`#${id}Svg`).style("width"));

    const h = parseInt(d3.select(`#${id}Svg`).style("height"));
    //I should define global media query
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    let margin = 0;
    //if(mediaQuery.matches) margin = 50

    //max radius that can fit in container
    //which is why values used in arc functions are fractions of it
    //to make room for labels and such to fit
    const r = Math.min(w, h) / 2 - margin;

    //g
    svg = svg.append("g").attr("transform", `translate(${w / 2}, ${h / 2})`);
    //const color = d3.schemeCategory10;
    const pie = d3.pie().value((d) => d.value);
    const arcs = pie(data);
    const transitionTime = 1000;

    const mainArc = { inner: r * 0.6, outer: r * 0.95 };
    const arc = d3.arc().innerRadius(mainArc.inner).outerRadius(mainArc.outer);

    const labelArc = { inner: r * 0.9, outer: r * 0.9 };
    const outerArc = d3
      .arc()
      .innerRadius(labelArc.inner)
      .outerRadius(labelArc.outer);
    function tweenPie(b) {
      let i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return function (t) {
        return arc(i(t));
      };
    }
    if(transition){
      svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => color[i])
      .transition()
      .ease(d3.easeElasticOut.amplitude(1).period(0.99))
      .duration(transitionTime)
      .attrTween("d", tweenPie);
    }else{
      svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => color[i])
      .attr('d', arc)

    }

    
    
    
    //.attr("d", arc);
    //https://www.d3-graph-gallery.com/graph/donut_label.html
    //borrowed this cus labels look so nice here.
    //addAnnotation(svg, arcs, arc, outerArc, r, transitionTime)
    addLegend(d3.select('svg'), margin, r, w, h, mainArc, data, color, mediaQuery)
    
}

function addLegend(svg, margin, r, w, h, mainArc, data, color, mediaQuery){
  //Annotations should be based off width only and not height, as they will float right**
  const g = svg.append('g')
    .attr('transform', `translate(${w/2}, ${h/2})`)
  const spacing = r * 0.1

  g.selectAll('legendRects')
    .data(data)
    .enter()
    .append('rect')
      .attr('x', r * 0.99)
      .attr('y', (d,i) => -r * 0.95 + (spacing*i))
      .attr('width', r * 0.08)
      .attr('height', r * 0.08)
      .attr('stroke-width', 0.5)
      .attr('stroke', '#000')
      .attr('fill', (d,i) => color[i])
  console.log(mediaQuery)
  g.selectAll('legendLabels')
    .data(data)
    .enter()
    .append('text')
      .attr('x', r * 1.08)
      .attr('y', (d,i) => -r * 0.95 + (spacing*i) + (mediaQuery.matches?5:10))
      .attr('font-size', '1.25vw')
      //.attr('font-size', mediaQuery.matches?'10px':'16px')
      .text(d => d.label)
      
}

function addAnnotation(svg, arcs, arc, outerArc, r, transitionTime){
  const lines = svg
      .selectAll("annotationLines")
      .data(arcs)
      .enter()
      .append("polyline")
      .attr("id", "annotationLines")
      .attr("opacity", 0)
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 0.8)
      .attr("points", function (d) {
        let posA = arc.centroid(d); // line insertion in the slice
        let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        let posC = outerArc.centroid(d); // Label position = almost the same as posB
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = r * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      })
      .transition()
      .duration(transitionTime)
      .attr("opacity", 1);

    const labels = svg
      .selectAll("annotationLabels")
      .data(arcs)
      .enter()
      .append("text")
      .attr("id", "annotationLabels")
      .attr("opacity", 0)
      .text(function (d) {
        return d.data.label;
      })
      .attr("transform", function (d) {
        let pos = outerArc.centroid(d);
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;

        pos[0] = r * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      })
      .transition()
      .duration(transitionTime)
      .attr("opacity", 1);
}

export default buildPieChart;