import { Route, Switch, useRouteMatch } from "react-router";
import PlayersList from "../components/PlayerSearch/PlayersList";

const AllPlayers = (props) => {
    const match = useRouteMatch()
    //console.log(match)
    return (
        <PlayersList/>
    )
}
export default AllPlayers;