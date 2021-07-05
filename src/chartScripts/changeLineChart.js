import * as d3 from 'd3'
import buildLineChart from './buildLineChart'

const changeLineChart = (id, data, stat, transition, themes) => {
    const container = d3.select(`#${id}`);
    container.selectAll('svg').remove()
    buildLineChart(id, data, stat, transition, themes)
    

}
export default changeLineChart