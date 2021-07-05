import {useEffect, useState } from "react";
import classes from "./PieChart.module.css";
import { useDispatch, useSelector } from "react-redux";
//import { chartActions } from "../../store/chartSlice";
import buildPieChart from "../../chartScripts/buildPieChart.js";
import changePieChart from "../../chartScripts/changePie.js";
//import buildLineChart from "../../chartScripts/buildLineChart";
import { playerActions } from "../../store/playerSlice.js";
import * as d3 from 'd3'
import React from 'react'
const PieChart = (props) => {
  const theme = useSelector(state => state.ui.theme)
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.currentPlayer);
  const loading = useSelector(state => state.ui.loading)
  const [isLoading, setIsLoading] = useState(true);
  const [imageState, setImageState] = useState(null)
  //const imageUrl = `${process.env.REACT_APP_DOMAIN}assets/owl_logos/Dallas_Fuel.svg`
  // const [imagedLoaded, setImageLodaded] = useState(false)
  // useEffect(() => {
  //   const getPlayers = async () => {
  //     const res = await fetch(
  //       `${process.env.REACT_APP_DOMAIN}api/v1/players/all`
  //     );
  //     const resData = await res.json();
  //     //dispatch(playerActions.setPlayers(resData.players));
  //     //console.log(resData)
  //   };
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
    //console.log(s[s.selectedIndex].innerText);
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
    //console.log(player);
    //might need to do this for for other charts since it can be undefined?
    //player && (theme.primary !== null
    if (!loading) {
      console.log('trigger');
      setImageState( `${process.env.REACT_APP_DOMAIN}assets/owl_logos/${player.teamName.split(' ').join('_')}.svg`)
      const xmlPath =  `${process.env.REACT_APP_DOMAIN}assets/owl_logos/${player.teamName.split(' ').join('_')}.svg`
      //console.log(`${player.teamName.split(' ').join('_')}.svg`)
      //setImageURL(player.teamName)
      setIsLoading(false);
      buildPieChart(props.id, player, player.stats.all[0].name, true, theme,xmlPath);
      // const w = parseFloat(d3.select(`#${props.id}Svg`).style("width"));

      // const h = parseFloat(d3.select(`#${props.id}Svg`).style("height"));
      // setLogoStyle({
      //   width: w,
      //   height: h
      // })
      
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
  

  
  // return (
  //   <div className={classes.fill2} id={props.id}></div>
  // )
  return (
    <div className={classes.PieChart} style={{backgroundColor: theme.primary}}>
      {/* {!loading && <img className={classes.image} src={imageState} alt='Dallas Fuel Logo' id='svgLogo' style={{opacity:0}}/>} */}
      {/* still need to add loading modal and erase last theme on load */}
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className={classes.filter} style={{color: theme.tertiary}}>
          <span>General Stats By Hero (All Matches)</span>
          {options()}
        </div>
      )}
      {/* {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className={classes.filter} style={{color: theme.tertiary}}>
          <span>General Stats By Hero (All Matches)</span>
          {options()}
        </div>
      )} */}
      <div className={classes.fill} id={props.id}></div>
    </div>
  );
};
export default PieChart;
