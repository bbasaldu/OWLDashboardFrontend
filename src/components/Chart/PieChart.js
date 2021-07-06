import {useEffect} from "react";
import classes from "./PieChart.module.css";
import { useDispatch, useSelector } from "react-redux";
import buildPieChart from "../../chartScripts/buildPieChart.js";
import changePieChart from "../../chartScripts/changePie.js";
import { playerActions } from "../../store/playerSlice.js";
import LoadingCard from "../General/LoadingCard";
import * as d3 from 'd3'
import React from 'react'
const PieChart = (props) => {
  const theme = useSelector(state => state.ui.theme)
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.currentPlayer);
  const loading = useSelector(state => state.ui.loading)
 

  const options = () => {
    return (
      <select onChange={changePieData}>
        {player.stats.all.map((stat, i) => {
          return <option key={`pieChartOption${i}`}>{stat.name}</option>;
        })}
      </select>
    );
  };

  function changePieData(ev) {
    const s = ev.target.options;
    const newStat = s[s.selectedIndex].innerText;
    const xmlPath =  `${process.env.REACT_APP_DOMAIN}assets/owl_logos/${player.teamName.split(' ').join('_')}.svg`
    changePieChart(props.id, player, newStat, true,theme, xmlPath);
    dispatch(
      playerActions.setPlayerChartData({
        id: props.id,
        data: player,
        selection: newStat,
        type: "pie",
        xmlPath
      })
    );
  }
  useEffect(() => {
    //might need to do this for for other charts since it can be undefined?
    //player && (theme.primary !== null
    if (!loading) {
      
      const xmlPath =  `${process.env.REACT_APP_DOMAIN}assets/owl_logos/${player.teamName.split(' ').join('_')}.svg`

      
      buildPieChart(props.id, player, player.stats.all[0].name, true, theme,xmlPath);
      const mediaQuery = window.matchMedia("(max-width: 600px)");
      if(!mediaQuery.matches){
        d3.select("#lineChart").node().scrollIntoView({ behavior: "smooth" });
      }
      else {
        d3.select("#pieChart").node().scrollIntoView({ behavior: "smooth" });
      }

      
      dispatch(
        playerActions.setPlayerChartData({
          id: props.id,
          data: player,
          selection: player.stats.all[0].name,
          type: "pie",
          xmlPath
        })
      );
    }
  }, [dispatch, props.id, player, theme, loading]);
  


  return (
    <div className={classes.PieChart} style={{backgroundColor: theme.primary}}>

      {loading && <LoadingCard/>}
      {!loading && (
        <div className={classes.filter} style={{color: theme.tertiary}}>
          <span>General Stats By Hero (All Matches)</span>
          {options()}
        </div>
      )}
     {!loading &&  <div className={classes.fill} id={props.id}></div>}
    </div>
  );
};
export default PieChart;
