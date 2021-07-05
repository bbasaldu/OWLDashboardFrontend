import * as d3 from "d3";

const buildPieChart = (id, rawData, selection, transition, themes, xml) => {
  const color = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];
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
  // data = {
  //   label: 'test1',

  // }
  //console.log(data)

  const container = d3.select(`#${id}`);
  let svg = container
    .append("svg")
    .attr("id", `${id}Svg`)
    //.attr("viewBox", `0 0 ${w} ${h}`)
    .attr("width", "100%")
    .attr("height", "100%");

  const w = parseFloat(d3.select(`#${id}Svg`).style("width"));

  const h = parseFloat(d3.select(`#${id}Svg`).style("height"));
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
  const mediaQuery = window.matchMedia("(max-width: 900px)");
  const spacing = w * 0.025;
  const symbolDim = bbox.height;
  const textDim = bbox.width + spacing; //+ legendSymbolWidth;
  const margin = textDim + symbolDim + spacing;
  //let margin = 0;
  //if(mediaQuery.matches) margin = 50

  //max radius that can fit in container
  //which is why values used in arc functions are fractions of it
  //to make room for labels and such to fit
  const mh = h * 0.1;
  const r = Math.min(w - margin, h) / 2;

  //g
  const g = svg
    .append("g")
    .attr("transform", `translate(${(w - margin) / 2}, ${h / 2})`);

  //svg = svg.append("g").attr("transform", `translate(${w / 2}, ${h / 2})`);
  //const color = d3.schemeCategory10;
  const pie = d3.pie().value((d) => d.value);
  const arcs = pie(data);
  const transitionTime = 1000;

  const mainArc = { inner: r * 0.6, outer: r * 0.95 };
  const logoDim = (mainArc.inner * 2) / Math.sqrt(2);

  d3.xml(xml,).then((svgData) => {
    const newNode = svgData.documentElement.cloneNode(true);
    //console.log(svgData.documentElement)
    const node = g.node().appendChild(newNode);

    const svgLogo = d3
      .select(node)
      .attr("id", "svgLogo")
      //.attr('viewBox', `0 0 ${w/2} ${h/2}`)
      .attr("y", -logoDim / 2)
      .attr("x", -logoDim / 2)
      .attr("height", logoDim)
      .attr("width", logoDim)

    //.style('opacity', 1)

    if (transition) {
      svgLogo.style('opacity', 0)
      .transition().duration(transitionTime)
        .style('opacity', 1)
      // const path = svgLogo.selectAll("path");
      // const pathLength = path.node().getTotalLength();
      // path
      //   .attr("stroke-dasharray", pathLength + " " + pathLength)
      //   .attr("stroke-dashoffset", pathLength)
      //   .style("fill", themes.primary)
      //   .style("stroke", themes.secondary)
      //   .style("stroke-width", 3)
      //   .transition()
      //   .duration(transitionTime)
      //   .attr("stroke-dashoffset", 0)
      //   .on("end", () => {
      //     path
      //       .transition()
      //       .duration(500)
      //       .style("fill", themes.secondary)
      //       .style("stroke-width", 0);
      //   });
    }
  });

  const arc = d3.arc().innerRadius(mainArc.inner).outerRadius(mainArc.outer);

  const labelArc = { inner: r * 0.9, outer: r * 0.9 };

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
      .attr("fill", (d, i) => color[i])
      .transition()
      .ease(d3.easeElasticOut.amplitude(1).period(0.99))
      .duration(transitionTime)
      .attrTween("d", tweenPie);
  } else {
    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => color[i])
      .attr("d", arc);
  }
  let range = [];
  if (h < w) {
    range = [h / 2 + r * 0.95, h / 2 - r * 0.95];
  } else {
    range = [(w - margin) / 2 + r * 0.95, (w - margin) / 2 - r * 0.95];
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
    .attr("fill", (d, i) => color[i])
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
  //console.log(textColor)
  //.attr("d", arc);
  //https://www.d3-graph-gallery.com/graph/donut_label.html
  //borrowed this cus labels look so nice here.
  //addAnnotation(svg, arcs, arc, outerArc, r, transitionTime)
  // addLegend(
  //   d3.select("svg"),
  //   margin,
  //   r,
  //   w,
  //   h,
  //   mainArc,
  //   data,
  //   color,
  //   mediaQuery
  // );
};

function addLegend(svg, margin, r, w, h, mainArc, data, color, mediaQuery) {
  //Annotations should be based off width only and not height, as they will float right**
  const g = svg.append("g").attr("transform", `translate(${w / 2}, ${h / 2})`);
  const spacing = r * 0.1;
  //width = % of dist from x to w
  //x=some dist from pie
  //width = (w/2)-(r*0.99)
  //x+width = w
  const distx = w / 2 - r * 0.99;
  const disty = h / 2;
  const band = d3
    .scaleBand()
    .domain(data.map((d, i) => i))
    .range([(h / 2) * 0.95, (h / 2) * 0.01])
    .padding(0.25);

  // g.selectAll('legendRect2')
  //   .data(data)
  //   .enter()
  //   .append('rect')
  //     .attr('x', (w/2)+(r*0.99))
  //     .attr('y', (d,i) => band(i))
  //     .attr('width', Math.min(distx * 0.25, band.bandwidth()))
  //     .attr('height', band.bandwidth())
  //     .attr('stroke', '#000')
  //     .attr('fill', (d,i) => color[i])

  // g.selectAll('legenedLabels2')
  //   .data(data)
  //   .enter()
  //   .append('text')
  //   .attr('x', (w/2)+(r*0.99)+Math.min(distx * 0.25, band.bandwidth()))
  //   .attr('y', (d,i) => band(i)+12)
  //   .attr('font-size', '1vw')
  //   .text(d => d.label)
  // .call(wrap, distx)

  g.selectAll("legendRects")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", r * 0.99)
    .attr("y", (d, i) => -r * 0.95 + spacing * i)
    .attr("width", r * 0.08)
    .attr("height", r * 0.08)
    .attr("stroke-width", 0.5)
    .attr("stroke", "#000")
    .attr("fill", (d, i) => color[i]);
  //console.log(mediaQuery)

  g.selectAll("legendLabels")
    .data(data)
    .enter()
    .append("text")
    .attr("x", r * 1.08)
    .attr(
      "y",
      (d, i) => -r * 0.95 + spacing * i + (mediaQuery.matches ? 5 : 10)
    )
    //.attr('font-size', '1.25vw')
    .attr("font-size", mediaQuery.matches ? "1.5vh" : "1.25vw")
    .text((d) => d.label);
}

function addAnnotation(svg, arcs, arc, outerArc, r, transitionTime) {
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
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 0, //parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

export default buildPieChart;
