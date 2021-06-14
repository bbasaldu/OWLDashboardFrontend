import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import buildPercentileLine from "../../chartScripts/buildPercentileLine";
import classes from "./StatInfo.module.css";
import * as d3 from "d3";
import changePercentileLine from "../../chartScripts/changePercentileLine";
import { playerActions } from "../../store/playerSlice.js";

const StatInfo = (props) => {
  const player = useSelector((state) => state.player.currentPlayer);
  const [isLoading, setIsLoading] = useState(true);
  const [stat, setStat] = useState(0);
  const dispatch = useDispatch();
  function changeInfoData(ev) {
    const s = ev.target.options;
    //console.log(s[s.selectedIndex].innerText);
    //const newStat = s[s.selectedIndex].innerText;
    setStat(player.stats.all[s.selectedIndex]);
    changePercentileLine(
      props.id,
      player.stats.all[s.selectedIndex].percentile
    );
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
        <div>{`${stat.percentile * 100}`.split(".")[0]} percentile</div>
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
    if (player !== null) {
      setStat(player.stats.all[0]);
      buildPercentileLine(props.id, player.stats.all[0].percentile);
      dispatch(
        playerActions.setPlayerChartData({
          id: props.id,
          data: player.stats.all[0].percentile,
          type: "percentile",
        })
      );
      setIsLoading(false);
    }
  }, [props.id, player, dispatch]);

  return (
    <div className={classes.container}>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className={classes.filter}>
          <span>General Stats By Hero </span>
          {options()}
        </div>
      )}
      <div className={classes.fill}>
        {!isLoading && info()}
        <div id={props.id}></div>
      </div>
    </div>
  );
};
export default StatInfo;
