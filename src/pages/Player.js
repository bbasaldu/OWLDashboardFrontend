import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import DashBoard from "../components/DashBoard/DashBoard";
import { playerActions } from "../store/playerSlice.js";
import { uiActions } from "../store/uiSlice.js";
import React from "react";


import NotFoundError from "../components/General/NotFoundError";
//on data loading show modal and scroll to bottom
const Player = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [playerFound, setPlayerFound] = useState(true)
  useEffect(() => {
    const getPlayerData = async () => {
      dispatch(uiActions.setLoading(true));
      const resP = await fetch(
        `${process.env.REACT_APP_DOMAIN}api/v1/players/${params.name}`
      );
      const resDataP = await resP.json();
      if (resP.status !== 404) {
        setPlayerFound(true)
        const teamName = resDataP.foundPlayer.teamName.split(" ");
        //console.log(teamName[teamName.length-1])
        const resT = await fetch(
          `${process.env.REACT_APP_DOMAIN}api/v1/teams/colors/${
            teamName[teamName.length - 1]
          }`
        );
        const resDataT = await resT.json();

        dispatch(uiActions.setTheme(resDataT));
        dispatch(playerActions.setPlayer(resDataP.foundPlayer));
        dispatch(uiActions.setLoading(false));
      }
      else {
        setPlayerFound(false)
      }
    };
    getPlayerData();
  }, [dispatch, params.name]);

  
  return (
    <div>
      {/* Player Page for {params.name} */}
      {!playerFound && <NotFoundError/>}
      {playerFound&&<DashBoard name={params.name} />}
    </div>
  );
};
export default Player;
