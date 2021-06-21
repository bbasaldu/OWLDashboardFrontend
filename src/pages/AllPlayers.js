//import { Route, Switch, useRouteMatch } from "react-router";
import PlayersList from "../components/PlayerSearch/PlayersList";
import React from 'react'
import PaginatePlayers from "../components/PlayerSearch/PaginatePlayers";
const AllPlayers = (props) => {
    //const match = useRouteMatch()
    //console.log(match)
    return (
        <PaginatePlayers elemLimit={10}/>
        // <PlayersList/>
    )
}
export default AllPlayers;