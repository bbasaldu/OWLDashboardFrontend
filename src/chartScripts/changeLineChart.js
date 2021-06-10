import * as d3 from 'd3'
import buildLineChart from './buildLineChart'

const changeLineChart = (id, data, stat, transition) => {
    const container = d3.select(`#${id}`);
    container.selectAll('svg').remove()
    buildLineChart(id, data, stat, transition)
    

}
export default changeLineChart