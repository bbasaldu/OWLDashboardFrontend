import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import DashBoard from "../components/DashBoard/DashBoard";
import * as d3 from 'd3'
import {playerActions} from '../store/playerSlice.js';
import { uiActions } from "../store/uiSlice.js";
import React from 'react'
//on data loading show modal and scroll to bottom
const Player = (props) => {
    const params = useParams()
    const dispatch = useDispatch()
    //const [isLoading, setIsLoading] = useState(true)
    //const [playerData, setPlayerData] = useState(null)
    useEffect(() => {
    
        const getPlayerData = async () =>{
          const resP = await fetch(`${process.env.REACT_APP_DOMAIN}api/v1/players/${params.name}`)
          const resDataP = await resP.json()
          const teamName = resDataP.foundPlayer.teamName.split(' ')
          //console.log(teamName[teamName.length-1])
          const resT = await fetch(`${process.env.REACT_APP_DOMAIN}api/v1/teams/colors/${teamName[teamName.length-1]}`)
          const resDataT = await resT.json()
          //dispatch(playerActions.setPlayers(resData.players))
          //setPlayerData(resData.foundPlayer)
          dispatch(uiActions.setTheme(resDataT))
          dispatch(playerActions.setPlayer(resDataP.foundPlayer))
          //console.log(resData.foundPlayer)
          d3.select('#lineChart').node().scrollIntoView({behavior: 'smooth'})
        }
        getPlayerData()
        
        
      }, [dispatch, params.name])

      // useEffect(() => {
      //   d3.select('#rectDiv3').node().scrollIntoView({behavior: 'smooth'})
      //   setIsLoading(false)
      // }, [isLoading])
    return (
        <div>
            {/* Player Page for {params.name} */}
            
            <DashBoard name={params.name}/>
        </div>
       
        
    )
}
export default Player;