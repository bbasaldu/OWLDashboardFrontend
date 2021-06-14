import { useEffect, useState } from "react";
import * as d3 from "d3";
import classes from "./LineChart.module.css";
import { useDispatch, useSelector } from "react-redux";
//import { chartActions } from "../../store/chartSlice";
import { playerActions } from "../../store/playerSlice.js";
//import { Delaunay } from "d3-delaunay";
import buildLineChart from "../../chartScripts/buildLineChart.js";
import changeLineChart from "../../chartScripts/changeLineChart.js";

const LineChart = (props) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.currentPlayer);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  function changeLineData(ev) {
    const s = ev.target.options;

    const newStat = s[s.selectedIndex].innerText;
    changeLineChart(props.id, player.matches, newStat, true);
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
    if (player !== null) {
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
      buildLineChart(props.id, player.matches, filteredOptionsVar[0], true);
      setIsLoading(false);
      //console.log(filteredOptionsVar);
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
      //console.log(filteredOptions)
      //console.log(maxStatsIndex);
    }

    // dispatch(
    //   chartActions.addChartVars({ data, id: props.id, margin, type: "line" })
    // );
  }, [props.id, dispatch, player]);

  return (
    <div className={classes.RectChart}>
      {isloading && <div>Loading...</div>}
      {!isloading && (
        <div className={classes.filter}>
          <span>General Stats - By Match </span>
          {options()}
        </div>
      )}
      <div className={classes.fill} id={props.id}></div>
    </div>
  );
};
export default LineChart;
