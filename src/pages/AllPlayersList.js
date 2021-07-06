import { Fragment } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import List from "../components/PlayerSearch/List";
import SearchBar from "../components/PlayerSearch/SearchBar";
const AllPlayersList = () => {
    const params = useParams()
    return (
        <Fragment>
            <SearchBar/>
            <List elemLimit={10} pageNum={params.page}/>
        </Fragment>
    )
}
export default AllPlayersList