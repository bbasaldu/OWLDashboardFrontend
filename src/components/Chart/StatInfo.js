import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import buildPercentileLine, { changePercentile } from "../../chartScripts/buildPercentileLine";
import classes from "./StatInfo.module.css";
import * as d3 from "d3";
import changePercentileLine from "../../chartScripts/changePercentileLine";
import { playerActions } from "../../store/playerSlice.js";
import React from 'react'
const StatInfo = (props) => {
  const player = useSelector((state) => state.player.currentPlayer);
  const theme = useSelector(state => state.ui.theme)
  const [isLoading, setIsLoading] = useState(true);
  const [stat, setStat] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading)
  const percentileToString = (percentile) => {
    const temp = `${percentile * 100}`.split(".")[0]
    let fullString;
    const lastNum = parseInt(temp[temp.length-1])
    //console.log(lastNum)
    if(lastNum === 1 && temp!=='11'){
      fullString = temp+'st'
    }
    else if(lastNum === 2){
      fullString = temp+'nd'
    }
    else if(lastNum === 3){
      fullString = temp+'rd'
    }
    else {
      fullString = temp+'th'
    }

    return fullString
  }
  function changeInfoData(ev) {
    const s = ev.target.options;
    //console.log(s[s.selectedIndex].innerText);
    //const newStat = s[s.selectedIndex].innerText;
    setStat(player.stats.all[s.selectedIndex]);
    changePercentile(props.id, player.stats.all[s.selectedIndex].percentile)
    // changePercentileLine(
    //   props.id,
    //   player.stats.all[s.selectedIndex].percentile
    // );
    dispatch(
      playerActions.setPlayerChartData({
        id: props.id,
        data: player.stats.all[s.selectedIndex].percentile,
        type: "percentile",
      })
    );
    //changePieChart(props.id, player, newStat);
  }
  const info = () => {
    return (
      <Fragment>
        <div className={classes.statAmount}>
          {d3.format(",")(stat.value.toFixed(0))}
        </div>
        {/* <div>League average: xxx</div> */}
        <div>Rank: {stat.ranking}</div>
        <div>{percentileToString(stat.percentile)} percentile</div>
      </Fragment>
    );
  };
  const options = () => {
    return (
      <select onChange={changeInfoData}>
        {player.stats.all.map((stat, i) => {
          return <option key={`statInfoOption${i}`}>{stat.name}</option>;
        })}
      </select>
    );
  };

  useEffect(() => {
    if (!loading) {
      setStat(player.stats.all[0]);
      buildPercentileLine(props.id, player.stats.all[0].percentile,theme);
      dispatch(
        playerActions.setPlayerChartData({
          id: props.id,
          data: player.stats.all[0].percentile,
          type: "percentile",
        })
      );
      setIsLoading(false);
    }
  }, [props.id, player, dispatch, loading, theme]);

  return (
    <div className={classes.container}>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className={classes.filter} style={{color: theme.tertiary,
          backgroundColor: theme.primary}}>
          <span>General Stats By Hero (All Matches)</span>
          {options()}
        </div>
      )}
      <div className={classes.fill} style={{color: theme.tertiary,
         backgroundColor: theme.primary}}>
        {!isLoading && info()}
        <div id={props.id}></div>
      </div>
    </div>
  );
};
export default StatInfo;
