import * as d3 from 'd3'
import buildPieChart from './buildPieChart.js'
const changePieChart = (id, rawData, stat, transition, themes, xmlPath)=>{
    const container = d3.select(`#${id}`);
    container.selectAll('svg').remove()
    buildPieChart(id, rawData, stat,transition ,themes, xmlPath)
    /* 
    .join(
        enter, for new stat
        update, no need
        exit for old stat
    )
    */
}
export default changePieChart