
import * as d3 from 'd3'
import buildLineChart from "./buildLineChart.js"
import buildPercentileLine from './buildPercentileLine.js';
import buildPieChart from './buildPieChart.js';
//small thing to add, make it scroll to bottom on resize

const resizeCharts = (charts) => {
    for(const chart of charts){
        //console.log(chart)
        const container = d3.select(`#${chart.id}`);
        container.selectAll('svg').remove()
        if(chart.type === 'line'){
            buildLineChart(chart.id, chart.data, chart.selection, false)
        }
        if(chart.type === 'pie'){
            buildPieChart(chart.id, chart.data, chart.selection, false)
        }
        if(chart.type === 'percentile'){
            buildPercentileLine(chart.id, chart.data, false)
        }
    }
}
export default resizeCharts