import classes from "./PlayersList.module.css";
import { useSelector } from "react-redux";
//import { useMemo } from "react";
import {useHistory, useRouteMatch } from "react-router-dom";
const PlayersList = () => {
  const players = useSelector((state) => state.player.players);
    const match = useRouteMatch()
    const history = useHistory()
    const routePlayerPage = (name) =>{
        history.push(`${match.path}/${name}`)

    }
  return (
    <div className={classes.PlayerListLayout}>
      <div className={classes.Legend}>
        <span>Player Name</span>
        <span>Team Name</span>
      </div>
      <ul className={classes.PlayerList}>
        {players.map((p, i) => (
          <li key={p._id} onClick={() => {routePlayerPage(p.name)}}>
           
            <span style={{ cursor: "pointer" }}>{p.name}</span>
            <span>{p.teamName}</span>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlayersList;
