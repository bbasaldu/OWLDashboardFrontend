import React, { Fragment, useEffect } from "react"
import Container from "../Chart/Containter"
import classes from './DashBoard.module.css'
import * as d3 from 'd3'
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/uiSlice"
import { playerActions } from "../../store/playerSlice"
const DashBoard = (props) => {
    const theme  = useSelector(state => state.ui.theme)
    const dispatch = useDispatch()
    //put charts into div
    useEffect(() => {
        //to ensure svgs are erased on each player dashboard
        //Need to remove after leaving dashboard page instead ***
        d3.selectAll('svg').remove()
        //reset 
        // dispatch(uiActions.setTheme(null))
        // dispatch(playerActions.setPlayer(null))
        console.log('called')
    }, [])
    return (
        <Fragment>
            <div className={classes.headerContainer} style={{backgroundColor: theme.secondary}}>
                <div className={classes.playerHeader}>{props.name}</div>
            </div>
            <Container/>
        </Fragment>
    )
}
export default DashBoard