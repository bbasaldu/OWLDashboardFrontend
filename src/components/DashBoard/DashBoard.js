import { Fragment, useEffect } from "react"
import Container from "../Chart/Containter"
import classes from './DashBoard.module.css'
import * as d3 from 'd3'
const DashBoard = (props) => {
    //put charts into div
    useEffect(() => {
        //to ensure svgs are erased on each player dashboard
        d3.selectAll('svg').remove()
    }, [])
    return (
        <Fragment>
            <div className={classes.playerHeader}>{props.name}</div>
            <Container/>
        </Fragment>
    )
}
export default DashBoard