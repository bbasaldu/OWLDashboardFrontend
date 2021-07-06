import { useEffect, useState } from "react";
import * as d3 from "d3";
import classes from "./LineChart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/playerSlice.js";
import buildLineChart from "../../chartScripts/buildLineChart.js";
import changeLineChart from "../../chartScripts/changeLineChart.js";
import LoadingCard from "../General/LoadingCard";
import React from 'react'
const LineChart = (props) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.currentPlayer);
  const theme = useSelector(state => state.ui.theme)
  const [filteredOptions, setFilteredOptions] = useState([]);
  const loading = useSelector(state => state.ui.loading)
  function changeLineData(ev) {
    const s = ev.target.options;

    const newStat = s[s.selectedIndex].innerText;
    changeLineChart(props.id, player.matches, newStat, true, theme);
    dispatch(
      playerActions.setPlayerChartData({
        id: props.id,
        data: player.matches,
        selection: newStat,
        type: "line",
      })
    );
  }

  const options = () => {
    return (
      <select onChange={changeLineData}>
        {filteredOptions.map((stat, i) => {
          return <option key={`lineChartOption${i}`}>{stat}</option>;
        })}
      </select>
    );
  };

  useEffect(() => {
    if (!loading) {
      let filteredOptionsVar = [];
      //not all matches share the same number of stats
      //this doesn't work for whats supposed to be a 'continous' plot of match stat data
      //so i need to find stats that all matches have in common, so i can plot them over time/over matches
      //i should try to add another property from my backend transformation of the data for this
      const maxStatsIndex = player.matches.findIndex(
        (m) =>
          m.stats.all.length ===
          d3.max(player.matches, (d) => d.stats.all.length)
      );
      player.matches[maxStatsIndex].stats.all.forEach((s) => {
        let statName = s.name;

        let common = true;
        for (let i = 0; i < player.matches.length; i++) {
          if (i === maxStatsIndex) {
            continue;
          }
          const found = player.matches[i].stats.all.find(
            (s) => s.name === statName
          );
          if (!found) {
            common = false;
            break;
          }
        }
        if (common) {
          filteredOptionsVar.push(statName);
        }
      });
      buildLineChart(props.id, player.matches, filteredOptionsVar[0], true, theme);
      
      setFilteredOptions(filteredOptionsVar);
      //might change data, since player state already contains player data
      dispatch(
        playerActions.setPlayerChartData({
          id: props.id,
          data: player.matches,
          selection: filteredOptionsVar[0],
          type: "line",
        })
      );

    }


  }, [props.id, dispatch, player, loading, theme]);

  return (
    <div className={classes.RectChart} style={{backgroundColor: theme.primary}}>
      {loading && <LoadingCard/>}
      {!loading && (
        <div className={classes.filter} style={{color:theme.tertiary}}>
          <span>General Stats - By Match </span>
          {options()}
        </div>
      )}
      {!loading && <div className={classes.fill} id={props.id}></div>}
    </div>
  );
};
export default LineChart;
