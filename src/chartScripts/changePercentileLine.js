import buildPercentileLine from "./buildPercentileLine"
import * as d3 from 'd3'
const changePercentileLine = (id, percentile) => {
    const container = d3.select(`#${id}`);
    container.selectAll('svg').remove()
    buildPercentileLine(id, percentile);
}

export default changePercentileLine;