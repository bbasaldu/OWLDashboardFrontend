import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { playerActions } from "./store/playerSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Player from "./pages/Player";
import resizeCharts from "./chartScripts/resizeCharts.js";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AllPlayersList from "./pages/AllPlayersList";
import {
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
function App() {
  const dispatch = useDispatch();
  const charts = useSelector((state) => state.player.playerChartData);
  const location = useLocation();
  const theme = useSelector(state => state.ui.theme)
  useEffect(() => {
    
    window.onresize = () => {
      
      if (location.pathname.includes('/player/')) {
        resizeCharts(charts, theme);
      }
    };
  }, [charts, location, theme]);

  useEffect(() => {
    const getPlayers = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_DOMAIN}api/v1/players/all`
      );
      const resData = await res.json();
      dispatch(playerActions.setPlayers(resData.players));
    };
    getPlayers();
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="players/1" />
        </Route>
       
        
        <Route path="/players/:page" >
          <AllPlayersList />
        </Route>
        <Route path="/players" >
          <Redirect to="players/1" />
        </Route>
        <Route path="/player/:name">
          <Player />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
