import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { useEffect } from "react";
import Layout from "./components/Layout";
import AllPlayers from "./pages/AllPlayers";
import { playerActions } from "./store/playerSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Player from "./pages/Player";
import resizeCharts from "./chartScripts/resizeCharts.js";
import About from "./pages/About";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import * as d3 from "d3";
function App() {
  const dispatch = useDispatch();
  const charts = useSelector((state) => state.player.playerChartData);
  const location = useLocation();

  useEffect(() => {
    
    window.onresize = () => {
      
      if (location.pathname.includes('/players/')) {
        resizeCharts(charts);
      }
    };
  }, [charts, location]);

  useEffect(() => {
    const getPlayers = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_DOMAIN}api/v1/players/all`
      );
      const resData = await res.json();
      dispatch(playerActions.setPlayers(resData.players));
      //console.log(resData)
    };
    getPlayers();
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="players" />
        </Route>
        <Route path="/players" exact>
          <AllPlayers />
        </Route>
        <Route path="/players/:name">
          <Player />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*"></Route>
      </Switch>
    </Layout>
  );
}

export default App;
