import buildPercentileLine from "./buildPercentileLine"
import * as d3 from 'd3'
const changePercentileLine = (id, percentile, themes) => {
    const container = d3.select(`#${id}`);
    container.selectAll('svg').remove()
    buildPercentileLine(id, percentile, themes, false);
}

export default changePercentileLine;