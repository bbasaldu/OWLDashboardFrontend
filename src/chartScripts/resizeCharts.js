
import * as d3 from 'd3'
import buildLineChart from "./buildLineChart.js"
import buildPercentileLine from './buildPercentileLine.js';
import buildPieChart from './buildPieChart.js';
//small thing to add, make it scroll to bottom on resize

/**
 * Resizes all charts given list of objects containing relevant chart information
 * @param {Object} charts - array of objects containing chart information
 */
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
    //centers screen on container on resize, looks weird if im scrolled at the top then it 'snaps' down
    //d3.select('#lineChart').node().scrollIntoView()
    
    
}
export default resizeCharts
