import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import DashBoard from "../components/DashBoard/DashBoard";
import * as d3 from 'd3'
import {playerActions} from '../store/playerSlice.js';
//on data loading show modal and scroll to bottom
const Player = (props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    //const [playerData, setPlayerData] = useState(null)
    useEffect(() => {
    
        const getPlayerData = async () =>{
          const res = await fetch(`${process.env.REACT_APP_DOMAIN}api/v1/players/${params.name}`)
          const resData = await res.json()
          //dispatch(playerActions.setPlayers(resData.players))
          //setPlayerData(resData.foundPlayer)
          dispatch(playerActions.setPlayer(resData.foundPlayer))
          console.log(resData.foundPlayer)
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