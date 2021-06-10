import { useEffect, useState } from "react";
import classes from "./PieChart.module.css";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
//import { chartActions } from "../../store/chartSlice";
import buildPieChart from "../../chartScripts/buildPieChart.js";
import changePieChart from "../../chartScripts/changePie.js";
import buildLineChart from "../../chartScripts/buildLineChart";

const data = [
  { label: "Hero 1", value: 23 },
  { label: "Hero 2", value: 41 },
  { label: "Hero 3", value: 53 },
  { label: "Hero 4", value: 62 },
  { label: "Wrecking Ball", value: 25 },
  { label: "Hero 6", value: 53 },
  { label: "Hero 7", value: 62 },
  { label: "Hero 8", value: 25 },
];

const PieChart = (props) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.currentPlayer);
  const [isLoading, setIsLoading] = useState(true);

  const options = () => {
    return (
      <select onChange={changePieData}>
      {player.stats.all.map((stat, i) => {
        return <option key={`pieChartOption${i}`}>{stat.name}</option>;
      })}
    </select>
    )
  };

  function changePieData(ev) {
    const s = ev.target.options;
    console.log(s[s.selectedIndex].innerText);
    const newStat = s[s.selectedIndex].innerText;
    changePieChart(props.id, player, newStat);
  }
  useEffect(() => {
    console.log(player);
    if (player !== null) {
      console.log(player);
      setIsLoading(false);
      buildPieChart(props.id, player, player.stats.all[0].name);
    }

    // dispatch(
    //   chartActions.addChartVars({
    //     data,
    //     id: props.id,
    //     margin,
    //     type: "pie",
    //     mainArc,
    //     labelArc,
    //   })
    // );
    //console.log(arcs)
  }, [dispatch, props.id, player]);

  return (
    <div className={classes.PieChart}>
      {!isLoading && <div className={classes.filter}>General Stats - By Hero {options()}</div>}
      {isLoading && <div>Loading...</div>}
      <div className={classes.fill} id={props.id}></div>;
    </div>
  );
};
export default PieChart;
