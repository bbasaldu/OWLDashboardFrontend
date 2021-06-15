import classes from "./Container.module.css";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import StatInfo from "./StatInfo";
import React from 'react'
const Container = (props) => {
  // const containerRef = useRef(null)
  //  useEffect(() => {
  //   containerRef.current.scrollIntoView({behavior: 'smooth'})
  //  })

  //pie chart dropdown menu
  //All matches(or select match) -> All maps(or select map) -> Stat

  //Line chart dropdown menu
  //By matches(ticks are matches only) or By maps(ticks show matches with maps in between, or some other cool way)
  return (
    <div className={classes.Container}>
      <div className={classes.rowContainer}>
        <div className={classes.rowItem}>
          <PieChart id="pieChart" />
        </div>
        <div className={classes.rowItem}>
          <StatInfo id="pLine" />
        </div>
      </div>

      <div className={classes.SubContainer}>
        <LineChart id="lineChart" />
      </div>
    </div>
  );
};
export default Container;
